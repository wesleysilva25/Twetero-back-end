import express, {json} from 'express'
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());
const pessoas = [];
const tweets=[];
let userBackup = {
  username:"",
  avatar:""
}


app.post('/sign-up', (req, res) => {
  const user = req.body; 
  pessoas.push(user);
  userBackup.username = user.username;
  userBackup.avatar = user.avatar;
  res.send("Ok");
});

app.post('/tweets', (req, res) => {
  const tweet = req.body; 
  tweets.push({...userBackup, ...tweet});
  res.send("Ok");
});


app.get('/tweets', (req, res) => {
  if(tweets.length<=10){
    res.send(tweets);
  }else {
    const tweetsReturn = tweets.slice(tweets.length-10, tweets.length);
    res.send(tweetsReturn);
  }

});


app.listen(5000);