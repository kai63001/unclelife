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
      case "phone_number":
        properties[name] = {
          phone_number: {},
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

  // console.log(inputForm);
  for (const [key, value] of Object.entries(input) as any) {
    if (value.type === "title" || value.type === "rich_text") {
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
    } else if (value.type === "select" || value.type === "status") {
      properties[key] = {
        [value.type]: {
          name: value.value as string,
        },
        type: value.type,
      };
    } else if (value.type === "date") {
      properties[key] = {
        [value.type]: {
          start: value.value as string,
        },
        type: value.type,
      };
    } else if (value.type === "files") {
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
    } else if (value.type === "multi_select") {
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
    } else if (value.type === "number") {
      properties[key] = {
        [value.type]: parseInt(value.value),
        type: value.type,
      };
    } else if (value.type === "radio_button") {
      properties[key] = {
        [value.type]: value.value,
        type: value.type,
      };
    } else {
      properties[key] = {
        [value.type]: value.value,
        type: value.type,
      };
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

export const addMapToLayer = (layer: any,property:any) => {
  const newLayer = layer.map((field: any) => {
    const { id, label, name, type, options: listOptions } = field;
    const newField = {
      ...field,
      mapType: Object.keys(property[name])[0],
      mapTo: name,
    };
    return newField;
  });
  return newLayer;
}

