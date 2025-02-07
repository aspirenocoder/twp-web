import React, { useState } from "react";
import bgImage from '../assets/path_line.png';
import { Doughnut, Bar } from "react-chartjs-2";
import { MdArrowBack } from "react-icons/md";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Cookies from "js-cookie";
import { GrAttachment } from "react-icons/gr";
Chart.register(...registerables);

const Unicom = () => {

    const [progress, setProgress] = useState(20);

    const createGradient = (ctx) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 150); // Vertical gradient
        gradient.addColorStop(0, "#004F99"); // Start color
        gradient.addColorStop(1, "#0084FF"); // End color
        return gradient;
    };

    const percentagePlugin = {
        id: "percentagePlugin",
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            const percentage = Math.round(progress); // Get the current progress percentage
            const fontSize = 60;

            // Set text color and style
            ctx.font = `${fontSize}px Raleway`;
            ctx.fillStyle = "#0084FF"; // Blue color for the text
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Calculate position (center of the doughnut)
            const x = chartArea.left + (chartArea.right - chartArea.left) / 2;
            const y = chartArea.top + (chartArea.bottom - chartArea.top) / 2;

            // Draw the percentage in the center
            ctx.fillText(`${percentage}%`, x, y);
        },
    };

    Chart.register(percentagePlugin);

    const data = {
        labels: [],
        datasets: [
            {
                data: [progress, 100 - progress],
                backgroundColor: (context) => {
                    const { ctx } = context.chart; // Get the context of the chart
                    return [
                        "#C3DBFF", // Background color for the remaining part
                        createGradient(ctx), // Apply gradient for the progress part
                    ];
                },
                borderWidth: 0, // Optional: Remove border between segments
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "85%",
        plugins: {
            datalabels: {
                display: false,
                // color: "#fff",
                // font: {
                //     weight: "bold",
                //     size: 16,
                // },
                // formatter: (value) => {
                //     return `${value}%`;
                // },
            },
        },
        elements: {
            arc: {
                borderRadius: (context) => {
                    // Apply borderRadius only for the active progress bar
                    const { datasetIndex, index } = context;
                    if (datasetIndex === 0 && index === 1) {
                        return 50; // Apply rounded corners to the active (progress) bar
                    }
                    return 0; // No rounded corners for the background (remaining) bar
                },
            },
        },
    };

    return (
        <div className="flex w-full justify-center items-center bg-gradient-to-t from-[#0042A6] via-[#0064FF] to-[#0042A6] flex-col">
            <div className="flex  w-full justify-around items-center mt-8">
                <img alt="twp-logo" className="w-40 h-auto" src={require("../assets/twp-logo.png")} />
                <div className="flex justify-center items-center flex-row">
                    <p className="text-2xl text-white">You're <span className="font-bold">Certified</span></p>
                    <img alt="paperplane" src={require("../assets/paperplane.png")} className="w-10 h-auto ml-2" />
                </div>
            </div>
            <div className="w-full mt-36 flex justify-around items-center">
                <div className="w-1/2">
                    <p className="text-4xl text-[#FFED4E] font-bold">Unicom is NOW a Thriving Workplace!</p>
                    <p className="text-white mt-5">We are honoured to recognize Unicom as a Thriving Workplace fot he year 2024-2025!</p>
                    <p className="text-white mt-5">Unicom has shown a heartfelt commitment to building a workplace where people feel valued, supported, and inspired. This recognition celebrates their dedication to creating an environment where employees can grow, succeed, and truly thrive. </p>
                    <p className="text-white">By focusing on the 10 Health Levers , Unicom has set a shining example of what it means to care for people while driving shared success. Their compassionate leadership fosters a sense of belonging, purpose, and unity that empowers everyone to do their best</p>
                </div>
                <div>
                    <img alt="certificate-badge" className="w-72 h-auto" src={require("../assets/badge.png")} />
                </div>
            </div>
            <div className="flex justify-center items-center w-full">
                <img alt="twp-elements" className="w-[70%] h-auto" src={require("../assets/dec1.png")} />
            </div>
            <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", height: '100%' }} className="z-10 w-[60%] -mt-[10%] flex justify-center items-center">
                {/* <img alt="path_line" src={require("../assets/path_line.png")} /> */}
                <div className="grid grid-cols-2 gap-8 w-[100%] mt-[10%] place-items-center z-10 rounded-3xl ">
                    <div className="bg-white rounded-xl w-96 h-90 flex-col p-4">
                        <div className="rounded-full border border-[#0064FF] w-32 h-32 -ml-12 -mt-12 bg-white flex justify-center items-center shadow-lg shadow-white">
                            <img alt="physiological_health_icon" className="w-24" src={require("../assets/physiological-health-icon.png")} />
                        </div>
                        <div className="flex w-full justify-center items-center flex-col -mt-[10%]">
                            <Doughnut className="w-[45%]" data={data} options={options} />
                        </div>
                        <p className="font-bold text-2xl text-center">Physiological Health</p>
                        <p>assesses if people take up an active role in enhancing their physical well-being for optimal performance and productivity</p>

                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                    <div className="bg-white rounded-xl w-80 h-96">
                        <p>Physiological Health</p>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Unicom;