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
            const fontSize = 40;

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

    const leverdata = [
        {
            name: "Physiological Health",
            desc: "assesses if people take up an active role in enhancing their physical well-being for optimal performance and productivity",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Social Health",
            desc: "assesses if people take up an active role in enhancing their physical well-being for optimal performance and productivity",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [81, 100 - 81],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Career Health",
            desc: "evaluates professional nurturing within the organization and provides overall security, ensuring not just job stability but a promising career",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Financial Health",
            desc: "examines employees' financial awareness of the status quo and efforts towards economic stability",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Culture Health",
            desc: "explores how the practices and values followed are unique, bragworthy, and effective in crafting a great experience",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Mental Health",
            desc: "examines if the workplace fosters emotional safety, ease of expression, and satisfaction for robust mental health",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Intellectual Health",
            desc: "indicates the level of synergy in the area to become a dynamic learning and innovative environment",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Tech & Digital Health",
            desc: "indicates how well the organization has adopted Data & Technology to be a faster, better and a smarter workplace",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },

        {
            name: "Business Health",
            desc: "understands the perceived organizational value through brand resonance, leadership and impact creation",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },
        {
            name: "Spiritual Health",
            desc: "assesses the alignment of individual purpose and their inclination to a larger societal mission",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [77, 100 - 77],
                        backgroundColor: (context) => {
                            const { ctx } = context.chart;
                            return [
                                "#C3DBFF",
                                createGradient(ctx),
                            ];
                        },
                        borderWidth: 0,
                    },
                ],
            },
        },

    ]

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
            <div className="flex  w-full justify-between items-center mt-8 pl-[18%] pr-[18%]">
                <img alt="twp-logo" className="w-40 h-auto" src={require("../assets/twp-logo.png")} />
                <div className="flex justify-center items-center flex-row">
                    <p className="text-2xl text-white">You're <span className="font-bold">Certified</span></p>
                    <img alt="paperplane" src={require("../assets/paperplane.png")} className="w-10 h-auto ml-2" />
                </div>
            </div>

            <div className="w-full mt-20 flex justify-between items-center pl-[18%] pr-[18%] -z-1">

                <div className="w-1/2">
                    <p className="text-4xl text-[#FFED4E] font-bold">Unicom Infotel Pvt. Ltd. is NOW a Thriving Workplace!</p>
                    <p className="text-white mt-5">We are super thrilled to honor <span className="text-[#FFED4E] font-bold">Unicom Infotel Pvt. Ltd.</span> as a Thriving Workplace!</p>
                    <p className="text-white mt-5">Unicom has shown an extraordinary commitment to building a workplace where people feel valued, supported, and inspired.</p>
                    <p className="text-white">By focusing on the 10 Health Levers, Unicom Infotel Private Limited demonstrates the perfect balance of compassionate leadership and organizational excellence, building an environment that values both its people and its culture.</p>
                    <p className="text-white">This recognition celebrates their dedication to creating an environment where employees can grow, succeed, and truly thrive.</p>
                </div>
                <div>
                    <img alt="certificate-badge" className="w-72 h-auto" src={require("../assets/badge.png")} />
                </div>
            </div>

            <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center top 15px", backgroundRepeat: "no-repeat", height: '100%' }} className="relative z-50 w-[65%] flex justify-center items-center overflow-visible ">
                {/* <img alt="path_line" src={require("../assets/path_line.png")} /> */}
                <div className="w-full">
                    <div className="flex justify-center items-center w-full mt-32">
                        <img alt="twp-elements" className="w-full h-auto" src={require("../assets/dec1.png")} />
                    </div>
                    <div className="grid grid-cols-2 gap-72 w-[100%] mt-[10%] place-items-center z-10 rounded-3xl ">
                        {leverdata.map((lever) => (
                            <div className="bg-white rounded-xl w-96 h-80 flex-col p-4">
                                <div className="rounded-full border border-[#0064FF] w-32 h-32 -ml-12 -mt-12 bg-white flex justify-center items-center shadow-lg shadow-white">
                                    <img alt="physiological_health_icon" className="w-24" src={require("../assets/physiological-health-icon.png")} />
                                </div>
                                <div className="flex justify-center items-center flex-col -mt-[20%]">
                                    <div className="flex w-40 h-40 justify-center items-center flex-col ">
                                        <Doughnut className="" data={lever.data} options={options} />
                                    </div>
                                    <p className="font-bold text-2xl text-center mt-3">{lever.name}</p>
                                    <p>{lever.desc}</p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center mt-[7%] z-10">
                <img alt="people1" className="w-[30%]" src={require("../assets/people1.png")} />
                <div className="w-[20%]">
                    <p className="text-2xl text-white text-center">Do you still measure engagement, satisfaction & culture? <span className="text-[#FFE70B] font-bold">Go beyond engagement.</span></p>
                    <p className="text-2xl text-white font-bold text-center">Take the Thriving Approach.</p>
                </div>
                <img alt="people2" className="w-[30%]" src={require("../assets/people2.png")} />
            </div>
            <div className="w-full -mt-[10%]">
                <img alt="people-line" src={require("../assets/people-line.png")} />
            </div>
            <div className="w-full flex justify-center items-center flex-col">
                <div className="bg-gradient-to-t from-[#FFE501] to-[#FEF073] p-3 rounded-lg font-semibold cursor-pointer">
                    <p>Visit Our Website</p>
                </div>
                <p className="text-white font-semibold mt-3 text-xl">Make your organization a Thriving workplace</p>
            </div>
            <div className="w-full flex justify-center items-center flex-col mt-11">
                <div className="w-[70%] bg-white rounded-xl flex justify-around items-center pt-5 pb-5 mb-10">
                    <div>
                        <div className="flex  items-center flex-row">
                            <p className="text-[#0042A6] font-bold text-lg">About Aspire</p>
                            <img alt="arrow-mark" className="w-[20px] h-[20px] ml-2" src={require("../assets/arrow.png")} />
                        </div>
                        <p className="text-lg">Contact <span className="underline">krishna.prasad@spigroup.in</span></p>
                        <p className="text-lg">Email <span className="underline">+91 94458 95581</span></p>
                        <div className="w-[70%] mt-8">
                            <p className="text-[#0042A6] font-semibold text-3xl">Become the Employer of Choice.</p>
                        </div>
                        <div className="mt-10 flex justify-center items-center flex-row">
                            <input placeholder="| Enter your business email" className="rounded-l-lg border border-r-transparent border-[#0042A6] p-2" />
                            <div className="bg-gradient-to-t from-[#FFE501] to-[#FEF073] p-3 rounded-lg font-semibold cursor-pointer">
                                <p>Get Certified Today</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 h-auto">
                        <img alt="people" src={require("../assets/people.png")} />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Unicom;