import AnnualIncomeTable from "./AnnualIncomeTable";
import "./Homepage.css";
import TotalsTable from "./TotalsTable";
import UpcomingOptionsExpirations from "./UpcomingOptionsExpirations";

const Homepage = () => {
  return (
    <main className="Homepage">
      <section>
        <TotalsTable />
        <AnnualIncomeTable />
      </section>
      <section>
        <UpcomingOptionsExpirations />
      </section>
    </main>
  );
};

export default Homepage;
