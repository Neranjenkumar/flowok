import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();
    const [chartWidth, setChartWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setChartWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data = {
        labels: incomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                borderColor: 'green',
                borderWidth: 1,
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: 'red',
                borderWidth: 1,
                tension: 0.2
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                    font: {
                        size: chartWidth < 768 ? 8 : 12
                    }
                }
            },
            y: {
                ticks: {
                    font: {
                        size: chartWidth < 768 ? 8 : 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: chartWidth < 768 ? 10 : 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Income vs Expenses',
                font: {
                    size: chartWidth < 768 ? 14 : 18
                }
            }
        },
        elements: {
            point: {
                radius: chartWidth < 768 ? 2 : 4
            }
        }
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    min-height: 300px;

    @media (max-width: 768px) {
        min-height: 200px;
        padding: 0.5rem;
    }
`;

export default Chart;
