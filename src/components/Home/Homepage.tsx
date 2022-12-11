import AnnualIncomeTable from "./AnnualIncomeTable";
import "./Homepage.css";
import TotalsTable from "./TotalsTable";
import UpcomingOptionsExpirations from "./UpcomingOptionsExpirations";

const Homepage = () => {
  return (
    <main className="Homepage">
      <section className="homepage-tables">
        <TotalsTable />
        <AnnualIncomeTable />
      </section>
      <section className="upcoming-expirations">
        <UpcomingOptionsExpirations />
      </section>
    </main>
  );
};

export default Homepage;
