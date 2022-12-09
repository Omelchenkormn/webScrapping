import chalk from 'chalk';
import { getPageContent } from './helpers/getPageContent.js'
import { parseEmails } from './helpers/parseEmails.js'
import { getOnlyUniqueLinks } from './helpers/getOnlyUniqueLinks.js';
import { getUniqueValues } from './helpers/getUniqueValues.js';
import parseLinks from './helpers/parseLinks.js'
import answer from './handlers/redline.js';

const BASE_URL = answer;

(async function webScrapper(url) {
  try {
    const emails = [];
    
    const content = await getPageContent(url); // puppeteer
    
    const links = parseLinks(content, url); // parse links from cherio 

    const parseRelativeLinks = async () => { // parse relative links 
      const relativeLinks = [];
      for (let link of links) {
        const content = await getPageContent(link);
        const newLinks = parseLinks(content, url);
        newLinks
          .forEach(newLink => {
          if (links.indexOf(newLink) === -1) {
            relativeLinks.push(newLink);
          }
        })
      }
      
      const uniqueRelativeLinks = new Set(relativeLinks); // selection only unique links 
      return Array.from(uniqueRelativeLinks);
    }

    const relativeLinks = await parseRelativeLinks(); // all the links 
    const allLinks = [...links, ...relativeLinks];
    console.log(chalk.blue(`Total links: ${allLinks.length}`));
    const uniqueLinks = getOnlyUniqueLinks(allLinks);
    console.log(chalk.blue(`Unique links: ${uniqueLinks.length}`));
    
    for (let link of uniqueLinks) { // parse emails for all links 
      const content = await getPageContent(link);
      parseEmails(content, link, emails);
    }
 
    const uniqueEmails = emails.filter(getUniqueValues); // select unique emails
    console.log(chalk.green("Total unique emails fond:") + '  ', chalk.bold(uniqueEmails.length));
    console.log(chalk.blue(uniqueEmails));

  } catch (err) {
    console.log(chalk.red('An error has occurred \n'));
    console.log(err)
  }

})(BASE_URL);



