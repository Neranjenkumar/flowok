import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {
    const categoryIcon = () => {
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance;
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return circle;
        }
    };

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return circle;
        }
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    );
}

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }

        @media (max-width: 768px) {
            width: 60px;
            height: 60px;
            i {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            width: 50px;
            height: 50px;
            i {
                font-size: 1.6rem;
            }
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }

            @media (max-width: 768px) {
                font-size: 1.1rem;
            }

            @media (max-width: 480px) {
                font-size: 1rem;
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }

            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;

                @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }

                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;

                    @media (max-width: 768px) {
                        font-size: 0.9rem;
                    }

                    @media (max-width: 480px) {
                        font-size: 0.8rem;
                    }
                }
            }
        }

        .btn-con{
            @media (max-width: 768px) {
                align-self: flex-end;
            }
        }
    }
`;

export default IncomeItem;
// IncomeItem.js
// import React from 'react';
// import styled from 'styled-components';

// function IncomeItem({ id, title, description, amount, date, type, category, indicatorColor, deleteItem }) {
//     return (
//         <IncomeItemStyled>
//             <div className="income-info">
//                 <h3>{title}</h3>
//                 <p>{description}</p>
//                 <p>{category} - {type}</p>
//                 <p>{new Date(date).toLocaleDateString()}</p>
//             </div>
//             <div className="income-actions">
//                 <span className="amount" style={{ color: indicatorColor }}>${amount}</span>
//                 <button className="delete" onClick={() => deleteItem(id)}>Delete</button>
//             </div>
//         </IncomeItemStyled>
//     );
// }

// const IncomeItemStyled = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 1rem;
//     background: #f3f4f6;
//     border-radius: 8px;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     margin-bottom: 1rem;
//     width: 100%;
//     max-width: 600px;
//     box-sizing: border-box;

//     .income-info {
//         flex: 1;
//         margin-right: 1rem;

//         h3 {
//             margin-bottom: 0.5rem;
//             font-size: 1.2rem;
//         }

//         p {
//             margin-bottom: 0.25rem;
//             font-size: 0.9rem;
//             color: #555;
//         }
//     }

//     .income-actions {
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//     }

//     .amount {
//         font-weight: bold;
//         font-size: 1.2rem;
//     }

//     .delete {
//         background-color: blue;
//         color: #fff;
//         border: none;
//         padding: 0.5rem 1rem;
//         border-radius: 5px;
//         cursor: pointer;
//         font-size: 1rem;
//     }

//     @media (max-width: 480px) {
//         flex-direction: column;
//         align-items: flex-start;

//         .income-info {
//             margin-right: 0;
//             margin-bottom: 0.5rem;

//             h3 {
//                 font-size: 1rem;
//             }

//             p {
//                 font-size: 0.8rem;
//             }
//         }

//         .income-actions {
//             width: 100%;
//             justify-content: space-between;
//             gap: 0.5rem;
//         }

//         .amount {
//             font-size: 1rem;
//         }

//         .delete {
//             padding: 0.4rem 0.8rem;
//             font-size: 0.875rem;
//         }
//     }
// `;

// export default IncomeItem;
