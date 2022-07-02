// link to likes and message store api
// like data
const projectApiId = 'gZumCAVMg7210Q6sIqx3';
const likesApiUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectApiId}/likes/`;

/* eslint-disable consistent-return */
export const addLike = async (itemId) => {
  const request = new Request(likesApiUrl);
  const response = await fetch(request, {
    method: 'POST',
    body: JSON.stringify({ item_id: `${itemId}` }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getLikesNumber = async () => {
  try {
    const response = await fetch(likesApiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error');
  }
};