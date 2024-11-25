import ReactSlider from 'react-slider'
import SettingsContext from './SettingsContext'
import { useContext } from 'react'
import BackButton from './BackButton'
import styles from './Settings.module.css'

function Settings() {

    const settingsInfo = useContext(SettingsContext);

    return (
        <div className={styles.setting}>
            <div className={styles.settingWrapper}>
                <label className={styles.workMinutes}>Work minutes: {settingsInfo.workMinutes}</label>
                <ReactSlider 
                    className={styles.sliderWork}
                    thumbClassName={styles.thumbWork}
                    trackClassName={styles.track}
                    value={settingsInfo.workMinutes}
                    onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                    min={15}
                    max={120}
                />
                <label className={styles.breakMinutes}>Break minutes: {settingsInfo.breakMinutes}</label>
                <ReactSlider 
                    className={styles.sliderBreak}
                    thumbClassName={styles.thumbBreak}
                    trackClassName={styles.track}
                    onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                    value={settingsInfo.breakMinutes}
                    min={5}
                    max={120}
                />
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>
            <div className={styles.bgLayers}>
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}

export default Settings