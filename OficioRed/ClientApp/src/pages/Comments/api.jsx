export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Super recomendable",
      username: "Tobías Bordino",
      userId: "4",
      parentId: null,
      createdAt: "2023-11-13T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "Gran Servicio",
      username: "Tomas Figueroa",
      userId: "2",
      parentId: null,
      createdAt: "2023-11-13T23:00:33.010+02:00",
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "Joaquin Ezequiel Sposetti",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
