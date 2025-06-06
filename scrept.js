const alarmList = [];

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();

  // Format: 06 June 2025
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  document.getElementById("date").textContent = now.toLocaleDateString('en-GB', options);

  // Check Alarms
  alarmList.forEach((alarm, index) => {
    if (alarm.time === now.toTimeString().slice(0, 5) && alarm.isOn) {
      const alarmSound = document.getElementById("alarmSound");
      if (alarmSound) {
        alarmSound.play();
        showAlarmMessage(alarm.time);
        alarm.isOn = false; // auto turn OFF after ring
        renderAlarms();
      }
    }
  });
}

function setAlarm() {
  const alarmTime = document.getElementById("alarmTime").value;
  if (alarmTime) {
    alarmList.push({ time: alarmTime, isOn: true });
    renderAlarms();
  }
}

function toggleAlarm(index) {
  alarmList[index].isOn = !alarmList[index].isOn;
  renderAlarms();
}

function renderAlarms() {
  const list = document.getElementById("alarmList");
  list.innerHTML = '';
  alarmList.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${alarm.time}
      <button onclick="toggleAlarm(${index})" style="background-color: ${alarm.isOn ? '#28a745' : '#6c757d'};">
        ${alarm.isOn ? 'ON' : 'OFF'}
      </button>
      <button onclick="deleteAlarm(${index})" style="background-color:#dc3545">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteAlarm(index) {
  alarmList.splice(index, 1);
  renderAlarms();
}

function showAlarmMessage(time) {
  const msg = document.createElement("div");
  msg.className = "alarm-msg";
  msg.textContent = `⏰ Alarm for ${time} is ringing!`;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 5000);
}

setInterval(updateClock, 1000);
