import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const api = {
    key: '260c4cfd6fbd3e449a7231d99ae75b32',
    base: "https://api.openweathermap.org/data/2.5/",
};

function Home() {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);

    useEffect(() => {
        if (weather) {
            renderPieChart();
            renderBarChart();
        }
    }, [weather]);

    const searchPressed = () => {
        fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then((result) => {
                setWeather(result);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    };

    const renderPieChart = () => {
        if (pieChartRef.current !== null) {
            pieChartRef.current.destroy();
        }
        const ctx = document.getElementById('pieChart');
        pieChartRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    label: 'Weather Information',
                    data: [weather.main.temp, weather.main.humidity, weather.wind.speed],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
        });
    };

    const renderBarChart = () => {
        if (barChartRef.current !== null) {
            barChartRef.current.destroy();
        }
        const ctx = document.getElementById('barChart');
        barChartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Temperature', 'Humidity', 'Wind Speed'],
                datasets: [{
                    label: 'Weather Information',
                    data: [weather.main.temp, weather.main.humidity, weather.wind.speed],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                indexAxis: 'y',
            },
        });
    };

    return (
        <div>
            <h1>Current Weather Updates</h1>
            <div>
                <input
                    className='my-3 rounded mx-3 border border-dark'
                    type='text'
                    placeholder='Enter city'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button className='btn btn-primary px-4 py-1' onClick={searchPressed}>Search</button>
            </div>
            {weather && (
                <div>
                    <div className="card text-bg-primary mb-3">
                        <div className="card-header">Today's Weather</div>
                        <div className="card-body">
                            <h5 className="card-title">{weather.name}</h5>
                            <span>{weather.main.temp} °C</span>
                        </div>
                    </div>
                    <div className='d-flex flex-row'>
                        <div className="card w-50 mb-3">
                            <div className="card-header">Pie Chart</div>
                            <div className="card-body">
                                <canvas id="pieChart"></canvas>
                            </div>
                        </div>
                        <div className="card w-50 mb-3 mx-2">
                            <div className="card-header">Bar Chart</div>
                            <div className="card-body">
                                <canvas id="barChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Heat Wave
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            A <strong>heatwave</strong> is a prolonged period of excessively hot weather, typically accompanied by high humidity. Heatwaves are characterized by temperatures significantly higher than the average for a particular region and time of year. They can occur in various parts of the world, from temperate climates to arid regions.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Global Warming
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Global warming</strong> refers to the long-term increase in Earth's average surface temperature due to human activities, primarily the release of greenhouse gases into the atmosphere. Greenhouse gases, such as carbon dioxide (CO2), methane (CH4), nitrous oxide (N2O), and water vapor, trap heat from the sun in the Earth's atmosphere, leading to a warming effect known as the greenhouse effect.
                            <br />
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Modal-1
                            </button>
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Weather Terms
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>Temperature:</strong> A measure of how hot or cold the air is, typically measured in degrees Celsius (°C) or Fahrenheit (°F).<br />
                            <strong>Humidity:</strong> The amount of moisture or water vapor present in the air, expressed as a percentage of the maximum amount of moisture the air can hold at a specific temperature and pressure.
                        </div>
                    </div>
                </div>
            </div>
            {/* First Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Global Warming Understood?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Modal body content */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticUnderstood">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Second Modal */}
            <div className="modal fade" id="staticUnderstood" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticUnderstoodLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticUnderstoodLabel">Confirm that you Understood?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Second modal body content */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
