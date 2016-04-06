# rum
Realtime real user monitoring built on Wilddog Service

![](./docs/screenshot.png)

## Prerequisite

You need to register for following two services

- `AMAP_KEY` from [AMAP](http://lbs.amap.com/)
- `WILDDOG_APP` from [Wilddog](https://www.wilddog.com/)

## Usage

### Fork the code

```
git clone  git@github.com:wyvernnot/rum.git
cd rum
npm install
```

### Build the files for client and dashboard

```
AMAP_KEY=938bcc87bfbd6aaeff217efae48f450a WILDDOG_APP=https://rum.wilddogio.com webpack -p
```

### Host static files somewhere

### Include scripts

**Client**

```<script src="PATH/client.js"></script>```

**Dashboard**

```<script src="PATH/bundle.js"></script>```

## Reference

### How to get location via IP ?

**JSON**
[ ] http://pv.sohu.com/cityjson?ie=utf-8
[ ] http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js

**JSONP**
[x] http://ip-api.com/json?callback=yourfunction

## LICENSE

GPL-3.0