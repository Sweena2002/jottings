

// API handler for updating an existing note
export default async function handler(req, res) {
  
  if (req.method == "POST"){
    const note_id = req.body['note_id']
    const content = req.body['content']
    const updated_by_user = req.body['updated_by_user']
    const jsonreq = JSON.stringify({
              content : content,
              updated_by_user: updated_by_user
          })
    console.log(jsonreq)
    console.log(note_id)
    try {
      const data = await sendRequestToPythonAPI('http://localhost:5000/updatenote/'+note_id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonreq
      });
      console.log(data) 
      if (data.success) {
          const url = '/' + updated_by_user;
          res.redirect(url);
      } else {
          res.redirect('/login?msg=' + encodeURIComponent(data.message));
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.redirect('/login?msg=An error occurred');
  }
} else {
  res.redirect('/');
}



async function sendRequestToPythonAPI(url, options) {
  try {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

  catch (error) {
    console.error('Error during API request:', error);
    throw error; // Rethrow the error to be handled higher up the call stack
}
}
}