/* eslint-disable no-irregular-whitespace */
importClass(android.content.Intent);

importClass(android.content.IntentFilter);

importClass(android.os.BatteryManager);

let BatteryN; //目前电量
let BatteryV; //电池电压
let BatteryT; //电池温度
let BatteryStatus; //电池状态
let BatteryTemp; //电池使用情况
let mBatInfoReceiver = new JavaAdapter(android.content.BroadcastReceiver, {
  onReceive: function (context, intent) {
    log(intent);

    let action = intent.getAction();
    /*
     * 如果捕捉到的action是ACTION_BATTERY_CHANGED， 就运行onBatteryInfoReceiver()
     */

    if (Intent.ACTION_BATTERY_CHANGED.equals(action)) {
      BatteryN = intent.getIntExtra('level', 0); //目前电量
      BatteryV = intent.getIntExtra('voltage', 0); //电池电压
      BatteryT = intent.getIntExtra('temperature', 0); //电池温度
      switch (
        intent.getIntExtra('status', BatteryManager.BATTERY_STATUS_UNKNOWN)
      ) {
        case BatteryManager.BATTERY_STATUS_CHARGING:
          BatteryStatus = '充电状态';

          break;

        case BatteryManager.BATTERY_STATUS_DISCHARGING:
          BatteryStatus = '放电状态';

          break;

        case BatteryManager.BATTERY_STATUS_NOT_CHARGING:
          BatteryStatus = '未充电';

          break;

        case BatteryManager.BATTERY_STATUS_FULL:
          BatteryStatus = '充满电';

          break;

        case BatteryManager.BATTERY_STATUS_UNKNOWN:
          BatteryStatus = '未知道状态';

          break;
      }

      switch (
        intent.getIntExtra('health', BatteryManager.BATTERY_HEALTH_UNKNOWN)
      ) {
        case BatteryManager.BATTERY_HEALTH_UNKNOWN:
          BatteryTemp = '未知错误';

          break;

        case BatteryManager.BATTERY_HEALTH_GOOD:
          BatteryTemp = '状态良好';

          break;

        case BatteryManager.BATTERY_HEALTH_DEAD:
          BatteryTemp = '电池没有电';

          break;

        case BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
          BatteryTemp = '电池电压过高';

          break;

        case BatteryManager.BATTERY_HEALTH_OVERHEAT:
          BatteryTemp = '电池过热';

          break;
      }

      log(
        '目前电量为' +
          BatteryN +
          '% --- ' +
          BatteryStatus +
          '\n' +
          '电压为' +
          BatteryV +
          'mV --- ' +
          BatteryTemp +
          '\n' +
          '温度为' +
          BatteryT * 0.1 +
          '℃'
      );
      toastLog(
        '目前电量为' +
          BatteryN +
          '% --- ' +
          BatteryStatus +
          '\n' +
          '电压为' +
          BatteryV +
          'mV --- ' +
          BatteryTemp +
          '\n' +
          '温度为' +
          BatteryT * 0.1 +
          '℃'
      );
      
    }
  },
});

// 注册一个系统 BroadcastReceiver，作为访问电池计量之用这个不能直接在AndroidManifest.xml中注册

let filter = new IntentFilter();

filter.addAction(Intent.ACTION_BATTERY_CHANGED);

context.registerReceiver(mBatInfoReceiver, filter);

events.on('exit', function () {
  unregisterReceiver();
});

function unregisterReceiver() {
  context.unregisterReceiver(mBatInfoReceiver);

  toastLog('关闭广播监听');
}

setInterval(function () {}, 1000);
