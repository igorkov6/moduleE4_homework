// index.js
// Задание 4.5.4 (HW-03)
// Ковалев Игорь FPW-2.0
// WebStorm 2022.3 + Google Chrome

// Управление устройствами аквариума:
//   лампа освещения - 100 Вт
//   подогреватель воды - 1000 Вт
//   насос подачи воздуха - 50 Вт
// каждое устройство можно включить и отключить
// уровень освещения задается в процентах
// уровень нагрева задается в процентах
// после исполнения любой команды
//   в консоль выводится текущее состояние системы
// потребляемая мощность устройства вычисляется
//   исходя их мощности устройства
//   с учетом заданного процента включения
//   для нагревателя - уровень нагрева
//   для лампы - уровень яркости
//   мощность насоса не изменяется

// родительский класс Устройство
class Device {

    // свойства родительского класса
    constructor(power) {
        this.power = power;     // мощность устройства
        this.isOn = false;      // признак включения
    }

    // методы родительского класса

    // управление устройством
    on(){                           // включить устройство
        this.isOn = true;
    }
    off(){                          // отключить устройство
        this.isOn = false;
    }

    // получить мощность устройства
    // если устройство не включено - мощность равна 0
    getPower(){
        return this.isOn ? this.power : 0;
    }
}

//дочерний класс Насос
class Pump extends Device {

    // свойства класса
    constructor(power) {        // мощность насоса
        super(power);
    }

    // методы класса

    //получить потребляемую мощность насоса
    getCurrentPower(){
        return super.getPower();
    }
}

// дочерний класс Нагреватель
class Heater extends Device {

    // свойства класса
    constructor(power) {
        super(power);           // мощность нагревателя
        this.heat = 100;        // заданный уровень нагрева, %
    }

    // методы класса

    // задать уровень нагрева
    setHeat(percent){
        this.heat = percent;
    }

    // вычислить потребляемую мощность нагревателя
    // в зависимости от заданного уровня нагрева
    getCurrentPower(){
        return super.getPower() * this.heat / 100;
    }
}

// дочерний класс лампа
class Lamp extends Device {

    // свойства класса
    constructor(power) {
        super(power);           // мощность лампы
        this.bright = 100;      // заданная яркость лампы, %
    }

    // методы класса

    // задать уровень яркости
    setBright(percent){
        this.bright = percent;
    }

    // вычислить потребляемую мощность лампы
    // в зависимости от заданного уровня яркости
    getCurrentPower(){
        return super.getPower() * this.bright / 100;
    }
}

// создать устройства
const pump = new Pump(50);
const lamp = new Lamp(100);
const heater = new Heater(1000);

// главный цикл:
const promptText = "valid commands:\npump on/off\nlamp on/off\nheater on/off\nbright n (1...n...100)\nheat n (1...n...100)\nexit";
let cmd = "";
do {
    // запрос команды
    cmd = prompt(promptText).toLowerCase();

    // парсинг команды
    let arr = cmd.split(" ");
    switch (arr[0]){
        // управление устройствами
        case 'pump':
        case 'lamp':
        case 'heater':
            // контроль валидности параметра
            if ((arr[1] === 'on') || (arr[1] === 'off')){
                switch (arr[0]){
                    case 'pump':
                        if (arr[1] === 'on') { pump.on(); }
                        else                 { pump.off(); }
                        break;
                    case 'lamp':
                        if (arr[1] === 'on') { lamp.on(); }
                        else                 { lamp.off(); }
                        break;
                    case 'heater':
                        if (arr[1] === 'on') { heater.on(); }
                        else                 { heater.off(); }
                        break;
                }
                // ошибочный параметр
            } else {
                console.log("\nInvalid parameter.\nMust be 'on' or 'off'.");
            }
            break;

            // управление мощностью устройств
        case 'bright':
        case 'heat':
            // контроль валидности параметра
            let percent = Number(arr[1]);
            if ((percent >= 1) && (percent <= 100)){
                switch (arr[0]){
                    case 'bright':
                        lamp.setBright(percent);
                        break;
                    case 'heat':
                        heater.setHeat(percent);
                        break;
                }
                // ошибочный параметр
            } else {
                console.log('\nInvalid parameter.\nMust be from 1 to 100.');
            }
            break;

            // завершить работу
        case 'exit':
            // отключить все устройства
            lamp.off();
            pump.off();
            heater.off();
            break;

            //ошибочная команда
        default:
            console.log('\nInvalid command')
    }

    // вывод текущего состояния устройств
    console.log('\ncurrent state:')
    console.log(`pump:   ${pump.isOn ? 'on ' : 'off'}`);
    console.log(`lamp:   ${lamp.isOn ? 'on ' : 'off'} bright: ${lamp.bright * lamp.isOn} %`);
    console.log(`heater: ${heater.isOn ? 'on ' : 'off'} heat:   ${heater.heat * heater.isOn} %`);
    // подсчет суммарной потребляемой мощности
    console.log(`power:  ${lamp.getCurrentPower() + heater.getCurrentPower() + pump.getCurrentPower()} W`);

} while (cmd !== 'exit');

console.log('\nBye');

