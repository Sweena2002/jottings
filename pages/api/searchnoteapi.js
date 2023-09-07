
// API handler for Searching a note
export default async function handler(req, res) {
  console.log("Inside Search API")
  const search = req.body['search']
    
    if (req.method == "POST"){
      const url = '/search/'+search
      res.redirect(url);
    } else {
      res.redirect('/');
    }
}