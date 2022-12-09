const regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

export function parseEmails(content, url, storage) {
  if (content) {
    const emails = content.match(regexp);
    storage.push(...emails);
    console.log("Emails on the page: " + url, emails);
  }
}