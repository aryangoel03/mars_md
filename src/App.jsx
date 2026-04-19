import { useState } from 'react'
import { scenarios } from './data/scenarios.js'
import IntroScreen from './screens/IntroScreen.jsx'
import PracticeSelectScreen from './screens/PracticeSelectScreen.jsx'
import ScenarioScreen from './screens/ScenarioScreen.jsx'
import ConclusionScreen from './screens/ConclusionScreen.jsx'

function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const NORMAL_CASE_COUNT = 3

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [mode, setMode] = useState('normal')
  const [selectedScenarios, setSelectedScenarios] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [totalMaxScore, setTotalMaxScore] = useState(0)

  function handleStart() {
    const picked = shuffled(scenarios).slice(0, NORMAL_CASE_COUNT)
    setSelectedScenarios(picked)
    setCurrentIndex(0)
    setTotalScore(0)
    setTotalMaxScore(0)
    setMode('normal')
    setScreen('scenario')
    window.scrollTo(0, 0)
  }

  function handlePractice() {
    setScreen('practiceSelect')
    window.scrollTo(0, 0)
  }

  function handlePracticeSelect(scenario) {
    setSelectedScenarios([scenario])
    setCurrentIndex(0)
    setTotalScore(0)
    setTotalMaxScore(0)
    setMode('practice')
    setScreen('scenario')
    window.scrollTo(0, 0)
  }

  function handleScenarioComplete(scenarioScore, scenarioMaxScore) {
    const newTotal = totalScore + scenarioScore
    const newMax = totalMaxScore + scenarioMaxScore
    setTotalScore(newTotal)
    setTotalMaxScore(newMax)

    if (currentIndex < selectedScenarios.length - 1) {
      setCurrentIndex(i => i + 1)
      window.scrollTo(0, 0)
    } else {
      setScreen('conclusion')
      window.scrollTo(0, 0)
    }
  }

  function handleRestart() {
    setScreen('intro')
    window.scrollTo(0, 0)
  }

  function handleTryAnother() {
    setScreen('practiceSelect')
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <div className="starfield" aria-hidden="true" />
      {screen === 'intro' && (
        <IntroScreen onStart={handleStart} onPractice={handlePractice} />
      )}
      {screen === 'practiceSelect' && (
        <PracticeSelectScreen
          scenarios={scenarios}
          onSelect={handlePracticeSelect}
          onBack={handleRestart}
        />
      )}
      {screen === 'scenario' && (
        <ScenarioScreen
          key={`${mode}-${currentIndex}`}
          scenario={selectedScenarios[currentIndex]}
          scenarioNumber={currentIndex + 1}
          totalScenarios={selectedScenarios.length}
          onComplete={handleScenarioComplete}
          onAbandon={handleRestart}
        />
      )}
      {screen === 'conclusion' && (
        <ConclusionScreen
          onRestart={handleRestart}
          onTryAnother={handleTryAnother}
          onMainMenu={handleRestart}
          score={totalScore}
          maxScore={totalMaxScore}
          mode={mode}
        />
      )}
    </div>
  )
}
