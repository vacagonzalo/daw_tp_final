class ViewMainPage {
    constructor(myf) {
        this.myf = myf;
    }
    showDevices(list) {
        let devicesUl = this.myf.getElementById("devicesList");
        let items = "";
        for (let i in list) {
            let checkedStr = "";
            if (list[i].state == "1")
                checkedStr = "checked";
            let img = "lightbulb";
            if (list[i].type == 1)
                img = "window";
            items +=
                `
              <li class='collection-item avatar'>
              <img src='images/${img}.png' alt='${img}' class='circle'>
              <span class='title'>${list[i].name}</span>
              <p>${list[i].description}<br></p>
              <a href='#!' class='secondary-content'>
                <div class='switch'>
                  <label>
                  Off
                  <input type='checkbox' id='dev_${list[i].id}' ${checkedStr}>
                  <span class='lever'></span>
                  On
                  </label>
                  </div>
              </a>
              </li>
              `;
        }
        devicesUl.innerHTML = items;
    }
    getSwitchStateById(id) {
        let el = this.myf.getElementById(id);
        return el.checked;
    }
}
