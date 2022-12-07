// Задание 4.5.4 (HW-03)
// Ковалев Игорь FPW-2.0
// WebStorm 2022.3 + Google Chrome

// родительский класс Устройство
class Device {

    // свойства родительского класса
    constructor(power) {
        this.power = power;     // мощность устройства
        this.isOn = false;      // признак включения
    }

    // методы родительского класса
    on(){                       // включить устройство
        this.isOn = true;
    }

    off(){                      // отключить устройство
        this.isOn = false;
    }

    getPower(){                 // получить текущую мощность
        return this.isOn ? this.power : 0;
    }
}

// дочерний класс бойлер
class Boiler extends Device {

    // свойства класса
    constructor(power, temp) {
        super(power);           // мощность бойлера
        this.temp = temp;       // заданная температура нагрева, %
    }

    // методы класса
    getTemp(){                  // получить температуру бойлера
        return super.getPower() ? this.temp : 0;
    }
}

// дочерний класс лампа
class Lamp extends Device {

    // свойства класса
    constructor(power, bright) {
        super(power);           // мощность лампы
        this.bright = bright;   // заданная яркость лампы, %
    }

    // методы класса
    getBright(){                // получить яркость лампы
        return super.getPower() ? this.bright : 0;
    }
}

// создать устройства
const lamp = new Lamp(100, 90);
const boiler = new Boiler(1000, 30);

// главный цикл:
const promptText = "valid commands:\nlamp on\nlamp off\nboiler on\nboiler off\nexit";
do {
    // запрос команды
    let cmd = prompt(promptText).toLowerCase();

    // завершить работу
    if (cmd === 'exit'){
        break;
    }

    // исполнение команды
    switch (cmd){
        case 'lamp on':
            lamp.on();
            break;
        case 'lamp off':
            lamp.off();
            break;
        case 'boiler on':
            boiler.on();
            break;
        case 'boiler off':
            boiler.off();
            break;
        default:
            console.log('Invalid command')
    }

    // вывод текущего состояния
    console.log('\ncurrent state:')
    console.log(`lamp:   ${lamp.isOn ? 'on ' : 'off'}  bright: ${lamp.getBright()} %`);
    console.log(`boiler: ${boiler.isOn ? 'on ' : 'off'}  temp:   ${boiler.getTemp()} %`);
    console.log(`power:  ${lamp.getPower() + boiler.getPower()} W`);

} while (true);

console.log('\nBye');
