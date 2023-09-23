export const convertLayerToProperty = (layer: any) => {
  const properties: any = {};

  layer.forEach((field: any) => {
    const { id, label, name, type, options:listOptions } = field;

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
                      id: option.id,
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
                      id: option.id,
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
                      id: option.id,
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
