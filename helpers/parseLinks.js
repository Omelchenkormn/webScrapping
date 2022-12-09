import cherio from 'cherio';

export default function getLinks(content, BASE_URL) {
  let links = new Set(); // links storage 

  const $ = cherio.load(content); // parse links 
  $('a').map((_, link) => {
    if ($(link).attr("href")
      && $(link).attr("href").startsWith('/')
      && !$(link).attr("href").includes('#')) {
      const fullLink = BASE_URL + $(link).attr('href');
      links.add(fullLink);
    }
  })
  return Array.from(links);
}
