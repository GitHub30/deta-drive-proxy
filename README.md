# deta-drive-proxy

### Usage

```bash
project_id=c0m8f10j
drive_name=Drive
filename=abc/hello.txt
API_KEY=c0m8f10j_uvveYTnAqUmVWCZ6oeCiJa9hoRPiSjif
curl https://public.deta.dev/$project_id/$drive_name/$filename?key=$API_KEY
```

A key is required on the first request.

### Examples

https://public.deta.dev/c0m8f10j/Drive/eevee.jpg?key=c0m8f10j_uvveYTnAqUmVWCZ6oeCiJa9hoRPiSjif

https://public.deta.dev/c0m8f10j/Drive/eevee.jpg

<img src=https://public.deta.dev/c0m8f10j/Drive/eevee.jpg>

### Deploy app

```bash
git clone https://github.com/GitHub30/deta-drive-proxy
cd deta-drive-proxy
npm install

echo 'BINARY_CONTENT_TYPES=image/*,audio/*,video/*,font/*,application/*' >> .env
echo 'KEY=xxxxxxxxxxx' >> .env
deta update -e .env

deta deploy

# for Debug
deta visor enable
```
