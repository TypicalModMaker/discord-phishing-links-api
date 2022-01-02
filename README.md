# discord-phishing-links-api
An API for https://github.com/nikolaischunk/discord-phishing-links made with express, node.js

I made this API purely for learning, please do not hate for my coding style

I might host this API soon

Features:
  - AutoUpdating list every 1 hour
  - Auto subdomain, subfolder trimmer
  
Tutorial:
  Create a GET request to /checklink with the domain query. Example: https://localhost:3000/checklink?domain=101nitro.com or https://localhost:3000/checklink?domain=anything.101nitro.com/anything
  
Possbile status codes:
  - 500 [domain-list.json badly parsed/not existing] FIX: rerun the server OR wait 1 hour until new domain-list.json sync
  - 404 [Domain is not in the list] - Message: Domain is in the list
  - 200 [Domain is in the list] - Message: Domain is not in the list

Special thanks to nikolaischunk and all contributors of [discord-phishing-links](https://github.com/nikolaischunk/discord-phishing-links)!
