class App extends  React.Component {
    state = {
        country: "" ,
        city: "" , 
        temp: "" ,
        hum: "" ,
        wind: "" ,
        icon: "" ,
        dis: "" ,
    }

    handleClick = async () => {
        const country = document.getElementById("Country").value;
        const city = document.getElementById("City").value;
        if(location.protocol === "http:"){
            var url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=0ae70435bee6018977309790ecd23cb6`, {mode: 'cors'});
        }else{
            var url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=0ae70435bee6018977309790ecd23cb6`, {mode: 'cors'});
        }
        // const url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=0ae70435bee6018977309790ecd23cb6`);
        var data = await url.json();
        console.log(data);
        this.setState ({
            temp: data.main.temp,
            hum: data.main.humidity,
            wind: data.wind.speed,
            icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            dis: data.weather[0].description,
            country: data.sys.country,
            city: data.name,

        })
    }

    render(){
        return(
            <div>
                <Display  
                    handleClick={this.handleClick}
                    temp={this.state.temp}
                    hum={this.state.hum}
                    wind={this.state.wind}
                    icon={this.state.icon}
                    dis={this.state.dis}
                    country={this.state.country}
                    city={this.state.city}
                />
            </div>
        )
    }
}

const Display = (props) =>{
    return(
         <div>
            <h1 className="top">Weather</h1>
            <div className="search-box">
                <input 
                    id="Country"
                    type="text"
                    placeholder="Country...."
                />
                <br/>
                <input 
                    id="City"
                    type="text"
                    placeholder="City...."
                />
                <br/>
                <button id="btn" onClick={props.handleClick} >Search</button>
            </div>
            
            <div className="show">
                <div>
                    <p className="showCountry">
                        {
                            props.country && <i>Country: {props.country}</i>
                        }
                    </p>
                    <p className="showCity">
                        {
                            props.city && <i>City: {props.city}</i>
                        }
                    </p>
                </div>
                
                <div className="showCity">
                    <p className="info">
                        {
                            props.temp && <span>Temperature :  {props.temp}&deg;<sup>c</sup></span>
                        }
                    </p>
                    <p className="info">
                        {
                            props.hum && <span>Humidity : {props.hum}%</span>
                        }
                    </p>
                    <p className="info">
                        {
                            props.wind && <span>Wind speed : {props.wind}km/h</span>
                        }
                    </p>
                    <p className="info">
                        {
                                 props.dis && <span>{props.dis} </span> 
                        }
                    </p>
                    {/* <p className="info">
                        {
                            props.icon && <img width="100px" src={props.icon}/>
                        }
                    </p> */}
                        
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('all'))