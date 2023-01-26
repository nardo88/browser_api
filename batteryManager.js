/**
 * Интерфейс BatteryManager предоставляет пути получения информации о уровне заряда батареи устройства.
 * 
 * Метод navigator.getBattery() возвращает battery promise, разрешающий использование BatteryManager интерфейса, который вы можете использовать для взаимодействия с Battery Status API 
 */
const charging = document.querySelector('.charging')
const baterylevel = document.querySelector('.batery-level')
const chargingTime = document.querySelector('.charging-time')
const dischargingTime = document.querySelector('.discharging-time')
const batery =  navigator.getBattery()


batery.then((battery) => {

    function updateAllBatteryInfo() {
      updateChargeInfo();
      updateLevelInfo();
      updateChargingInfo();
      updateDischargingInfo();
    }
    updateAllBatteryInfo();
  
    battery.addEventListener("chargingchange", () => {
      updateChargeInfo();
    });

    function updateChargeInfo() {
      console.log(`Battery charging? ${battery.charging ? "Yes" : "No"}`);
      charging.textContent = battery.charging ? "Да" : "Нет"
    }
  
    battery.addEventListener("levelchange", () => {
      updateLevelInfo();
    });

    function updateLevelInfo() {
      console.log(`Battery level: ${battery.level * 100}%`);
      baterylevel.textContent = battery.level * 100 + '%'
    }
  
    battery.addEventListener("chargingtimechange", () => {
      updateChargingInfo();
    });

    function updateChargingInfo() {
      console.log(`Battery charging time: ${battery.chargingTime} seconds`);
      chargingTime.textContent = `${battery.chargingTime} seconds`
    }
  
    battery.addEventListener("dischargingtimechange", () => {
      updateDischargingInfo();
    });

    function updateDischargingInfo() {
      console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
      dischargingTime.textContent = `${battery.dischargingTime} seconds`
    }

  });