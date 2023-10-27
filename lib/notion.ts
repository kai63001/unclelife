import { decode } from "base64-arraybuffer";

export const convertLayerToProperty = (layer: any) => {
  const properties: any = {};

  layer.forEach((field: any) => {
    const { id, label, name, type, options: listOptions } = field;

    switch (type) {
      case "title":
        properties[name] = {
          title: {},
        };
        break;
      case "phone_number":
        properties[name] = {
          phone_number: {},
        };
        break;
      case "rich_text":
        properties[name] = {
          rich_text: {},
        };
        break;
      case "number":
        properties[name] = {
          number: {},
        };
        break;
      case "select":
        properties[name] = {
          select: {
            options:
              listOptions.length > 0
                ? listOptions.map((option: any) => {
                    return {
                      name: option.name,
                      id: option.name,
                    };
                  })
                : [],
          },
        };
        break;
      case "radio_button":
        properties[name] = {
          select: {
            options:
              listOptions.length > 0
                ? listOptions.map((option: any) => {
                    return {
                      name: option.name,
                      id: option.name,
                    };
                  })
                : [],
          },
        };
        break;
      case "multi_select":
        properties[name] = {
          multi_select: {
            options:
              listOptions.length > 0
                ? listOptions.map((option: any) => {
                    return {
                      name: option.name,
                      id: option.name,
                    };
                  })
                : [],
          },
        };
        break;
      case "date":
        properties[name] = {
          date: {},
        };
        break;
      case "email":
        properties[name] = {
          email: {},
        };
        break;
      case "url":
        properties[name] = {
          url: {},
        };
        break;
      case "checkbox":
        properties[name] = {
          checkbox: {},
        };
        break;
      case "created_time":
        properties[name] = {
          created_time: {},
        };
        break;
      case "last_edited_time":
        properties[name] = {
          last_edited_time: {},
        };
        break;
      case "files":
        properties[name] = {
          files: {},
        };
        break;
      case "date":
        properties[name] = {
          date: {},
        };
        break;
      default:
        break;
    }
  });

  return properties;
};

export const convertInputToProperty = async (
  input: any,
  supabase: any,
  toast: any
) => {
  const properties: any = {};

  const validateValue = (value: any) => {
    if (value == "" || value == null || value == undefined) {
      return false;
    }
    return true;
  };

  // console.log(inputForm);
  for (const [key, value] of Object.entries(input) as any) {
    if (
      value.type === "title" ||
      (value.type === "rich_text" && validateValue(value.value))
    ) {
      properties[key] = {
        [value.type]: [
          {
            text: {
              content: value.value as string,
            },
          },
        ],
        type: value.type,
      };
    } else if (
      value.type === "select" ||
      (value.type === "status" && validateValue(value.value))
    ) {
      properties[key] = {
        [value.type]: {
          name: value.value as string,
        },
        type: value.type,
      };
    } else if (value.type === "date" && validateValue(value.value)) {
      properties[key] = {
        [value.type]: {
          start: value.value as string,
        },
        type: value.type,
      };
    } else if (value.type === "files" && validateValue(value.value)) {
      let url = "";
      if (value.value === "") {
        return;
      }
      // value.value is base64 upload to supabase
      const base64 = value.value.split("__name__")[0];
      const file = base64.split(",")[1];
      const name = value.value.split("__name__")[1];
      const contentType = base64.split(";")[0].split(":")[1];
      const randomName = `${Math.random()
        .toString(36)
        .substring(2, 15)}_${name}`;
      const { data, error } = await supabase.storage
        .from("files")
        .upload(randomName, decode(file), {
          cacheControl: "3600",
          contentType: contentType,
        });
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      //get url
      const uri = data?.path;
      const bucket = "files";
      url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${uri}`;

      properties[key] = {
        [value.type]: [
          {
            //random file name
            name: randomName,
            external: {
              url: url as string,
            },
          },
        ],
        type: value.type,
      };
    } else if (value.type === "multi_select" && validateValue(value.value)) {
      let newValue = value.value;
      if (typeof value.value === "string") {
        newValue = [value.value];
      }
      properties[key] = {
        [value.type]: [
          ...newValue?.map((item: any) => {
            return {
              name: item,
            };
          }),
        ],
        type: value.type,
      };
    } else if (value.type === "number" && validateValue(value.value)) {
      properties[key] = {
        [value.type]: parseInt(value.value),
        type: value.type,
      };
    } else if (value.type === "radio_button" && validateValue(value.value)) {
      properties[key] = {
        [value.type]: value.value,
        type: value.type,
      };
    } else {
      if (validateValue(value.value)) {
        properties[key] = {
          [value.type]: value.value,
          type: value.type,
        };
      }
    }
  }
  return properties;
};

// const mapList:any = {
//   title: "title",
//   rich_text: "rich_text",
//   number: "number",
//   select: "select",
//   radio_button: "select",
//   multi_select: "multi_select",
//   date: "date",
//   email: "email",
//   phone_number: "phone_number",
//   url: "url",
//   checkbox: "checkbox",
//   created_time: "created_time",
// }

// export const addMapToLayer = (layer: any) => {
//   const newLayer = layer.map((field: any) => {
//     const { id, label, name, type, options: listOptions } = field;
//     const newField = {
//       ...field,
//       value: mapList[type],
//     };
//     return newField;
//   });
//   return newLayer;
// }

export const addMapToLayer = (layer: any, property: any) => {
  const newLayer = layer.map((field: any) => {
    const { id, label, name, type, options: listOptions } = field;
    let newField = {
      ...field,
      // mapType: Object?.keys(property[name])[0],
      mapTo: name,
    };
    if (property[name]) {
      newField = {
        ...newField,
        mapType: Object?.keys(property[name])[0],
      };
    }
    return newField;
  });
  return newLayer;
};

export const convertListToTable = (list: any) => {
  const table: any = [];
  for (const item of list) {
    const row: any = {};
    for (const [key, value] of Object.entries(item.properties) as any) {
      const { type, ...rest } = value;
      let newValue = {
        ...rest,
        name: key,
        value: value[type],
      };
      if (Array.isArray(value[type])) {
        const firstItem = value[type][0];
        if (firstItem?.type === "text") {
          newValue.value = firstItem?.plain_text;
        } else if (firstItem?.type === "rich_text") {
          newValue.value = firstItem?.rich_text[0].plain_text;
        } else if (firstItem?.type === "title") {
          newValue.value = firstItem?.title[0].plain_text;
        } else if (firstItem?.type === "url") {
          newValue.value = firstItem?.url;
        } else if (firstItem?.type === "email") {
          newValue.value = firstItem?.email;
        } else if (firstItem?.type === "phone_number") {
          newValue.value = firstItem?.phone_number;
        } else if (firstItem?.type === "number") {
          newValue.value = firstItem?.number;
        } else if (firstItem?.type === "checkbox") {
          newValue.value = firstItem?.checkbox;
        } else if (firstItem?.type === "select") {
          newValue.value = firstItem?.select.name;
        } else if (firstItem?.type === "multi_select") {
          newValue.value = firstItem?.multi_select
            .map((option: any) => option.name)
            .join(", ");
        } else if (firstItem?.type === "date") {
          newValue.value = firstItem?.date.start;
        } else if (firstItem?.type === "created_time") {
          newValue.value = firstItem?.created_time;
        } else if (firstItem?.type === "last_edited_time") {
          newValue.value = firstItem?.last_edited_time;
        }
      }
      row[key] = newValue;
    }
    table.push(row);
  }
  return table;
};

export const convertBodyAndLayerToProperty = async (body: any, layer: any) => {
  const properties: any = {};

  const validateValue = (value: any) => {
    if (value == "" || value == null || value == undefined) {
      return false;
    }
    return true;
  };

  const mapNameWithLayer = (name: any) => {
    const field = layer.find((item: any) => item.name === name);
    if (field) {
      return field;
    }
    return null;
  };

  for (const [key, value] of Object.entries(body) as any) {
    if (mapNameWithLayer(key)?.type == undefined) {
      return
    }
    if (
      mapNameWithLayer(key)?.type === "title" ||
      (mapNameWithLayer(key)?.type === "rich_text" && validateValue(value))
    ) {
      properties[key] = {
        [mapNameWithLayer(key)?.type]: [
          {
            text: {
              content: value as string,
            },
          },
        ],
        type: mapNameWithLayer(key)?.type,
      };
    } else if (
      mapNameWithLayer(key)?.type === "select" ||
      (mapNameWithLayer(key)?.type === "status" && validateValue(value))
    ) {
      properties[key] = {
        [mapNameWithLayer(key)?.type]: {
          name: value as string,
        },
        type: mapNameWithLayer(key)?.type,
      };
    } else if (mapNameWithLayer(key)?.type === "date" && validateValue(value)) {
      properties[key] = {
        [mapNameWithLayer(key)?.type]: {
          start: value as string,
        },
        type: mapNameWithLayer(key)?.type,
      };
    } else if (mapNameWithLayer(key)?.type === "files" && validateValue(value)) {
      console.log("");
    } else if (
      mapNameWithLayer(key)?.type === "multi_select" &&
      validateValue(value)
    ) {
      let newValue = value;
      if (typeof value === "string") {
        newValue = [value];
      }
      properties[key] = {
        [mapNameWithLayer(key)?.type]: [
          ...newValue?.map((item: any) => {
            return {
              name: item,
            };
          }),
        ],
        type: mapNameWithLayer(key)?.type,
      };
    } else if (
      mapNameWithLayer(key)?.type === "number" &&
      validateValue(value)
    ) {
      properties[key] = {
        [mapNameWithLayer(key)?.type]: parseInt(value),
        type: mapNameWithLayer(key)?.type,
      };
    } else if (
      mapNameWithLayer(key)?.type === "radio_button" &&
      validateValue(value)
    ) {
      properties[key] = {
        [mapNameWithLayer(key)?.type]: value,
        type: mapNameWithLayer(key)?.type,
      };
    } else {
      if (validateValue(value)) {
        properties[key] = {
          [mapNameWithLayer(key)?.type]: value,
          type: mapNameWithLayer(key)?.type,
        };
      }
    }
  }

  return properties;
};

export const validateBodyAndLayer = (body: any, layer: any) => {
  //check it required
  let isRequired = false;
  let validate = {};

  for (const [key, value] of Object.entries(layer) as any) {
    if (value.required) {
      console.log(body,value.mapTo)
      if (body[value.mapTo] == "" || body[value.mapTo] == null || body[value.mapTo] == undefined) {
        isRequired = true;
        validate = {
          ...validate,
          [value.name]: {
            error: true,
            message: `${value.name} is required`,
          },
        };
      }
    }
  }

  return {
    isRequired,
    validate,
  };
};
