const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()
server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib POST route handler
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun1, adjective1, verb1, adverb1, noun2 } = req.body;
  
  // Check if all fields are filled
  if (!noun1 || !adjective1 || !verb1 || !adverb1 || !noun2) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }
  
  // Create the mad lib
  const madLib = `
    <h1>Your Completed Mad Lib</h1>
    <p>
      Once upon a time, there was a ${adjective1} ${noun1} who loved to ${verb1} ${adverb1}.
      Every day, the ${noun1} would wake up early, put on their favorite ${noun2}, and go outside to ${verb1}.
      People would watch in amazement as the ${adjective1} ${noun1} would ${verb1} so ${adverb1} that everyone wanted to join in.
      "Look at that ${noun1}!" they would shout. "I've never seen anyone ${verb1} so ${adverb1} while wearing a ${noun2}!"
      And that's how the ${adjective1} ${noun1} became famous for ${verb1} ${adverb1}.
    </p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    
    <footer>
        <p>Last updated: 
            <span id="lastModified"></span>
        </p>
    </footer>
    <script type="text/javascript">
         var x = document.lastModified;
         document.getElementById('lastModified').textContent = x;
    </script>
  `;
  
  res.send(madLib);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// The server uses port 80 by default unless you start it with the extra
// command line argument 'local' like this:
//       node server.js local
let port = 80
if (process.argv[2] === 'local') {
  port = 8080
}

server.listen(port, () => console.log('Ready on localhost!'))