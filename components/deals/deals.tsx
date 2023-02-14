import styles from "./deals.module.css";
import DealBig from "../dealbig/dealBig";
import DealSmall from "../dealSmall/dealSmall";
import { Service } from "../../interfaces/services.interface";

interface Props {
  deals: Service[]
}

export default  function Deals({deals}:Props) {
  
  return (
    <main>
      {
        {
          "1": <DealBig deal={deals[0]} />,
          "2": deals.map((deal) => <DealBig key={deal._id} deal={deal} />),
          "3": (
            <div className={styles.deals}>
              <DealBig deal={deals[0]} />
              <div className={styles.dealSmalls}>
                {deals
                  .map((deal) => <DealSmall deal={deal} key={deal._id} />)
                  .filter((_, index) => index > 0)}
              </div>
              ,
            </div>
          ),

          "4": (
            <div className={styles.dealSmalls}>
              {deals.map((deal) => (
                <DealSmall deal={deal} key={deal._id} />
              ))}
            </div>
          ),
        }[deals.length]
      }
    </main>
  );
}
