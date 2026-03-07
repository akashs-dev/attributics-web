---
title: "A Simplified Way To PowerBi Reporting Using Parameterised Queries : A QSR Use Case"
subtitle: ""
publishedAt: "2025-07-23"
readTime: "3 min read"
author:
  name: "Vakesh Singh"
  avatar: https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Salmanrampwalk.png/250px-Salmanrampwalk.png
heroImage: https://static.wixstatic.com/media/9e275a_3aed98829d844af98ef44a87b7ac2973~mv2.jpg/v1/fill/w_454,h_341,fp_0.50_0.50,q_90,enc_avif,quality_auto/9e275a_3aed98829d844af98ef44a87b7ac2973~mv2.jpg
featured: false
category: 'AI'
meta: 'blog'
---

## Introduction

At Attributics, enhancing business reporting has always been a priority. In a recent Quick Service Restaurant (QSR) project, we needed real-time dashboards that could adapt quickly to different business dimensions — such as market, brand, location, and channel — without affecting performance.

Built on Azure Databricks and Delta tables, the solution was powered by parameterized queries. This approach enabled dynamic filtering, reduced load times, and simplified data handling — all while maintaining a seamless user experience.

The result was a scalable reporting system that responded effortlessly to user input. In this article, we’ll explore what parameterized queries are, how we used them in Power BI, and why they’re key to building responsive, high-performance dashboards.


An in-depth view is presented next.


## What is a Parameterized Query?

In Power BI, a parameterized query is a powerful technique that allows dynamic values — such as filters selected by the user — to be passed directly into the data source query. Instead of using a static query that always retrieves a fixed value (e.g., WHERE column = 'Value'), the query is structured with variables, such as WHERE column = @Param.

These parameters can be defined and managed within Power BI, then connected to slicers in the report interface. This setup enables end-users to control which data is queried and displayed — all in real time.

For example, rather than writing a hardcoded query like:

- `SELECT * FROM data_table WHERE attribute = 'FixedValue'`

You would write:

- `SELECT * FROM data_table WHERE attribute = @DynamicParam`

The value of @DynamicParam is determined by the user’s selection in the report slicer.


This method offers two key advantages:

- It makes your report more flexible and scalable — one query works for multiple inputs.
- It reduces the amount of data being loaded, since only filtered data is fetched when needed.


In our case at Attributics, while working with Azure Databricks and Delta tables in Direct Query mode, parameterized queries helped us fetch just the required data for reports like Transacting Users, Retention, and Engagement, based on selected filters like Brand, Market, or Channel.


### Lets get into how to setup:

Creating a parameter is the first step toward making your Power BI reports dynamic and interactive. Here's how to set it up inside Power Query Editor :

**Step 1**: Open Power Query Editor In Power BI Desktop, go to the Home tab and click on Transform data. This will open the Power Query Editor.

**Step 2**: Navigate to Manage Parameters At the top ribbon, click on Manage Parameters → New Parameter.

![Step 2 Img](https://static.wixstatic.com/media/9e275a_a139cd556f154483b11e0e3350aebd89~mv2.png/v1/fill/w_814,h_463,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e275a_a139cd556f154483b11e0e3350aebd89~mv2.png)

**Step 3**: Define the Parameter 
A dialog box will appear. Here’s what you need to fill :


- Name: Give your parameter a clear name like BrandParam or MarketFilter.
- Description (optional): Helps document the purpose of the parameter.
- Data Type: Choose the appropriate type (Text, Number, etc.) based on what it will control.
- Suggested Values: Choose how the values should be set:
  - Any Value (free input)
  - List of Values (you define a few options)
  - Query (connect it to an existing list/table in your model)

![Step 3 Img](https://static.wixstatic.com/media/9e275a_5af33444e2454fdea6e7d0b6328d7311~mv2.png/v1/fill/w_512,h_548,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e275a_5af33444e2454fdea6e7d0b6328d7311~mv2.png)

**Step 4**: Set a Default and Current Value If needed, assign a default value (what should show first) and a current value (what's currently selected).

This parameter can now be used in your query logic or connected to slicers for interactivity in your report.

### Benefits of Using Parameterized Queries in Power BI

Using parameters in Power BI isn’t just a technical trick — it makes your reports smarter and easier to use. Here’s how:

1. **More Dynamic Reports**:- Instead of hardcoding filters, you can let users choose what data they want to see like selecting a brand, city, or channel — right from the report using slicers.
2. **Better Performance**:- Since Power BI only pulls the data that’s needed (thanks to the parameter), your reports load faster, especially when using DirectQuery.
3. **Reuse Across Reports**:- Once you create a parameter, you can use it in multiple      queries and pages. No need to repeat yourself.
4. **Easy to Maintain**:- Need to update a filter or business rule? Just change the parameter — no need to rewrite all your queries.
5. **Cleaner Queries**:- Your logic is easier to manage and understand when   parameters are used instead of hardcoded values.

### Performance Benefits of Using Parameterized Queries in Power BI

When working with large datasets (like we do for QSR brands), performance matters a lot. Parameterized queries can really help Power BI run faster and more efficiently.

Here’s how they help:

1. **Faster Queries**:- With parameters, Power BI sends only the data you need — like a specific Brand, Market, or Date range. This avoids loading huge tables and speeds up your report.

2. **Better Use of Server Resources**:- Power BI can reuse the query plan behind the scenes. That means less work for the server each time someone changes a filter.

3. **Dynamic Filters with Less Load**:- Instead of hardcoding filters, users can pick options from slicers (like Brand or Channel), and Power BI fetches exactly that data — no extras.

4. **Real-Life Example**:- Say you want sales data between two dates. Instead of filtering the whole data in Power BI after loading it, use parameters like:
`SELECT * FROM SalesData WHERE SaleDate BETWEEN @StartDate AND @EndDatePower` BI will only fetch data between those two dates — saving time and reducing the load.

5. **Scales Well as You Grow**:- More users or more data? No problem. Parameterized queries help keep things smooth even as the report grows.

---

## Conclusion

At Attributics, our goal is always to make data more actionable, accessible, and efficient. Parameterized queries in Power BI helped us do exactly that — especially when working with high-volume, fast-changing data environments like QSR brands.

By allowing reports to respond dynamically to user input while improving speed and scalability, this approach created a smoother experience for both business users and technical teams. Whether you're optimizing performance with DirectQuery or just building more flexible dashboards, parameterized queries are a great tool to have in your Power BI toolkit.


Have a similar challenge or want to explore this for your own data stack? Let’s connect.