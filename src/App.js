import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [number, setNumber] = useState(1)
  const [currentData, setCurrentData] = useState()
  const [extraData, setExtraData] = useState()
  const [locationData, setLocationData] = useState()


  const [activeTab, setActiveTab] = useState('about')


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(response => response.json())
    .then(data => setCurrentData(data)) 

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${number}/`)
    .then(response => response.json())
    .then(data => setExtraData(data)) 

    fetch(`https://pokeapi.co/api/v2/pokemon/11/encounters`)
    .then(response => response.json())
    .then(data => setLocationData(data[0].location_area.name)) 
  }, [number])

  const increaseNumber = () => {
    if(number < 151){
      setNumber(prev => prev + 1)
    }
  }

  const decreaseNumber = () => {
    if(number > 1){
      setNumber(prev => prev - 1)
    }
  }

  if(currentData){
    console.log()
  }

  return (
    <div className="App">
      {currentData && extraData && <>
      <div className='background'>
        <img src='pikachu.jpg'></img>
      </div>
      <div className='main'>
        <div onClick={increaseNumber} className='increase'>➡️</div>
        <div className='name'>{currentData.name.charAt(0).toUpperCase() + currentData.name.slice(1)}</div>
        <div onClick={decreaseNumber} className='decrease'>⬅️</div>

        <div className='icon'>
          <div className='icon_number'> #{number}</div>
          <div className='icon_topleftcircle'></div>
          <div className='icon_toprightcircle'></div>
          
          <div className='icon_inner'>
            <img src={currentData.sprites.other.dream_world.front_default} />
          </div>

          <div className='icon_bottomcircle'></div>
          <div className='icon_bottomlines'>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className='info'>
          <div className='info_tabs'>
            <div 
              onClick={() => setActiveTab('about')} 
              className={`info_tab ${activeTab === 'about' ? 'info_active' : ''}`}>About</div>
            <div 
              onClick={() => setActiveTab('stats')} 
              className={`info_tab ${activeTab === 'stats' ? 'info_active' : ''}`}>Stats</div>
            <div 
              onClick={() => setActiveTab('location')} 
              className={`info_tab ${activeTab === 'location' ? 'info_active' : ''}`}>Location</div>
          </div>
          <div className='info_text'>
            {activeTab === 'about' &&             
            <div className='about_tab'>
              <div className='about_text'>
                {extraData.flavor_text_entries[3].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')}
              </div>
              <div className='info_weight'>
                <div>⚖️ Weight</div>
                <div className='weight_data'>{(currentData.weight*.10).toFixed(1)} kg</div>
              </div>
              <div className='info_height'>
                <div>📏 Height</div>
                <div className='height_data'>{(currentData.height*.10).toFixed(1)} m</div>
              </div>
            </div>
            }
            {activeTab === 'stats' && 
              <div className='stats'>
                <div className='stat'>
                  <div className='stat_label'>HP</div>
                  <div className='stat_data'>{currentData.stats[0].base_stat}</div>
                </div>
                <div className='stat'>
                  <div className='stat_label'>ATTACK</div>
                  <div className='stat_data'>{currentData.stats[1].base_stat}</div>
                </div>
                <div className='stat'>
                  <div className='stat_label'>DEFENSE</div>
                  <div className='stat_data'>{currentData.stats[2].base_stat}</div>
                </div>
                <div className='stat'>
                  <div className='stat_label'>SP. ATK</div>
                  <div className='stat_data'>{currentData.stats[3].base_stat}</div>
                </div>
                <div className='stat'>
                  <div className='stat_label'>SP. DEF</div>
                  <div className='stat_data'>{currentData.stats[4].base_stat}</div>
                </div>
                <div className='stat'>
                  <div className='stat_label'>SPEED</div>
                  <div className='stat_data'>{currentData.stats[5].base_stat}</div>
                </div>
              </div>
            }
            {
              activeTab === 'location' && 
              <div className='location'>
                {locationData}
              </div>
            }

          </div>
        </div>
      </div>
      </>
    }
    </div>
  );
}

export default App;
