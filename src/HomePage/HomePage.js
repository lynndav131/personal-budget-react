import { useEffect, useState } from "react";
import { getBudgetData } from "../Services/Api";
import BudgetChart from "../Components/BudgetChart";
import BudgetD3Chart from "../Components/BudgetD3Chart";

function HomePage() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getBudgetData()
      .then(res => {
        const budget = res.data.myBudget || res.data.MyBudget;
        setChartData({
          labels: budget.map(item => item.title),
          datasets: [
            {
              label: "Budget",
              data: budget.map(item => item.budget),
              backgroundColor: budget.map(item => item.color)
            }
          ],
          raw: budget
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="center" id="main">
      <section className="page-area">
        <article aria-labelledby="track-title">
          <h1 id="track-title">Stay on track</h1>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>
        <article aria-labelledby="alerts-title">
          <h1 id="alerts-title">Alerts</h1>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>
        <article aria-labelledby="results-title">
          <h1 id="results-title">Results</h1>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>
        <article aria-labelledby="free-title">
          <h1 id="free-title">Free</h1>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>
        <article>
          <h1>Charts</h1>
          {chartData ? (
            <>
              <BudgetChart chartData={chartData} />
              <h2>D3.js Chart</h2>
              <BudgetD3Chart data={chartData.raw} />
            </>
          ) : (
            <p>Loading chart...</p>
          )}
        </article>
      </section>
    </main>
  );
}

export default HomePage;
