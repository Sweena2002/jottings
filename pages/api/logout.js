import Cookies from 'cookies'


// API handler for Logout functionality
export default async function handler(req, res) {
  
  if (req.method == "POST"){
    const cookies = new Cookies(req, res);
    
    const username = cookies.set('username');
    
    const url = '/';
    res.redirect(url);
} else {
  res.redirect('/');
}
}