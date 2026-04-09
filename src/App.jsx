import { useState } from 'react'
import { scenarios } from './data/scenarios.js'
import IntroScreen from './screens/IntroScreen.jsx'
import ScenarioScreen from './screens/ScenarioScreen.jsx'
import ConclusionScreen from './screens/ConclusionScreen.jsx'

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [scenarioIndex, setScenarioIndex] = useState(0)

  function handleStart() {
    setScenarioIndex(0)
    setScreen('scenario')
  }

  function handleScenarioComplete() {
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(i => i + 1)
    } else {
      setScreen('conclusion')
    }
  }

  function handleRestart() {
    setScenarioIndex(0)
    setScreen('intro')
  }

  return (
    <div className="app">
      <div className="starfield" aria-hidden="true" />
      {screen === 'intro' && (
        <IntroScreen onStart={handleStart} />
      )}
      {screen === 'scenario' && (
        <ScenarioScreen
          key={scenarioIndex}
          scenario={scenarios[scenarioIndex]}
          scenarioNumber={scenarioIndex + 1}
          totalScenarios={scenarios.length}
          onComplete={handleScenarioComplete}
        />
      )}
      {screen === 'conclusion' && (
        <ConclusionScreen onRestart={handleRestart} />
      )}
    </div>
  )
}
