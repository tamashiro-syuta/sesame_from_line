export type LockType = 'locked' | 'unlocked' | 'moved'

export type Status = {
  "batteryPercentage": number,             // 電池残量94%
  "batteryVoltage": number, // 電池の電圧, 単位: ボルト(V)
  "position": number,                      // セサミデバイスの角度, 360˚ は 1024
  "CHSesame2Status": LockType,         // locked | unlocked | moved
  "timestamp": number              // Sesame Shadow が更新された時間。 1970/1/1 00:00:00 からミリ秒単位のタイムスタンプ
}
