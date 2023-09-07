import Cookies from 'cookies'


// API handler to create a note
export default async function handler(req, res) {
  
  if (req.method == "POST"){
    const title = req.body['title']
    const content = req.body['notedata']
    const tags = req.body['tags']
    const cookies = new Cookies(req, res);
    const username = cookies.get('username');
    const jsonreq = JSON.stringify({
              username : username,
              title : title,
              content: content,
              tags: tags
          })
    console.log("content "+content)
    console.log("title "+title)
    try {
      const data = await sendRequestToPythonAPI('http://localhost:5000/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonreq
      });
      console.log(data) 
      if (data.success) {
          
          cookies.set('username', data.username);
          const url = '/' + data.username;
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