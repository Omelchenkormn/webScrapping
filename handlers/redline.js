import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function isValidUrl(url){
  var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return objRE.test(url);
}

const answer = await rl.question('Type your url website \n', (input));

const checkValidURL = (answer) => {
   if (isValidUrl(answer)) {
    //  console.log("your url is correct");
     console.log(`start searching for all emails and unique links on the site: ${answer}`);
     return answer
  }
  else {
    console.log("your url incorrect, please type correct url")
   return rl.close();
  }
}

export default checkValidURL(answer);

