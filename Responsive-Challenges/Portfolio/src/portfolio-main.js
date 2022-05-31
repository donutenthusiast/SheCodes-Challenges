function openNavLarge() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mySidenav").style.height = "100%";
  document.getElementById("mySidenav").style.padding = "50px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNavLarge() {
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.height = "0";
  document.getElementById("mySidenav").style.padding = "0";
}

function openNavSmall() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("mySidenav").style.height = "70px";
  document.getElementById("mySidenav").style.padding = "10px 5px";
  document.getElementById("main").style.marginLeft = "inherit";
}

function closeNavSmall() {
  document.getElementById("mySidenav").style.height = "0";
  document.getElementById("mySidenav").style.padding = "0";
}

function startCloseMenu() {
  const screenSize = window.innerWidth;
  if (screenSize > 800) {
    return closeNavLarge;
  }

  if (screenSize < 800) {
    return closeNavSmall;
  }
}

window.onresize = startCloseMenu();
