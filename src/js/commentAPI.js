const commentUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/HD7rIzbBh69v3OndP2xJ/comments'
export default class CommentApi {
  static async getComments(id) {
    const response = await fetch(`${commentUrl}/?item_id=${id}`);
    const data = await response.json();
    return data;
  }

  static async postComment(id, username, comment) {
    const response = await fetch(`${commentUrl}?item_id=/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        item_id: id,
        username,
        comment,
      }),
    });
    const data = await response.text();
    return data;
  }
}


