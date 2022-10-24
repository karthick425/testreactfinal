import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { stockActions } from '../_actions';
import { companyActions } from '../_actions';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
class StockDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCompany: "Select",
            CompanyCode: "",
            CompanyName: "",
            startdate: new Date(),
            enddate: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleStartdateChange = this.handleStartdateChange.bind(this);
        this.handlEnddateChange = this.handlEnddateChange.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.formatstockDate = this.formatstockDate.bind(this);
        this.formatAMPM = this.formatAMPM.bind(this);


    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    formatstockDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            time = d.getTime();
        debugger;
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-').concat(" ").concat(this.formatAMPM(new Date(date)));
    }
    handleChange(event) {
        const { selectedCompany, startdate, enddate, CompanyCode, CompanyName } = this.state;
        const { stocks, lstallcompanys } = this.props;
        this.setState({
            selectedCompany: event.target.value,
            CompanyCode: lstallcompanys.Itmallcompanys.find((x) => x.companyCode == event.target.value).companyCode,
            CompanyName: lstallcompanys.Itmallcompanys.find((x) => x.companyCode == event.target.value).companyName

        });
        this.props.getstocks(event.target.value, this.formatDate(startdate), this.formatDate(enddate));
    }
    handleStartdateChange(date) {
        debugger;
        const { selectedCompany, startdate, enddate } = this.state;
        this.setState({
            startdate: date
        });
        this.props.getstocks(selectedCompany, this.formatDate(date), this.formatDate(enddate));
    }
    handlEnddateChange(date) {
        debugger;
        const { selectedCompany, startdate, enddate } = this.state;
        this.setState({
            enddate: date
        });
        this.props.getstocks(selectedCompany, this.formatDate(startdate), this.formatDate(date));
    }
    componentDidMount() {
        const { selectedCompany } = this.state;
        //this.props.getstocks(selectedCompany, '2022-01-31', '2022-12-31');
        this.props.getallcompanys();
    }

    render() {
        const { stocks, lstallcompanys } = this.props;
        const { selectedCompany, startdate, enddate, CompanyCode, CompanyName } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className={'form-group'}>
                    <label htmlFor="SelectCompany">Select Company Code</label>
                    <select value={selectedCompany} onChange={this.handleChange} defaultValue={"Select"} class="form-control form-select" aria-label="Default select example">
                        <option key={"Select"} value={"Select"}>
                            {"Select"}
                        </option>
                        {lstallcompanys.Itmallcompanys &&
                            lstallcompanys.Itmallcompanys.map(option => (
                                <option key={option.companyCode} value={option.companyCode}>
                                    {option.companyName}
                                </option>
                            ))}
                    </select>
                </div>
                {CompanyCode && CompanyCode != '' &&
                    <div>
                        <div className={'form-group'}>
                            <label htmlFor="companycode">Company Code:</label>
                             {CompanyCode}
                            
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="companyname">Company Name:</label>
                            {CompanyName}                            
                        </div>
                    </div>
                }

                <div className={'form-group'}>
                    <label htmlFor="startdate">Start Date</label>
                    <DatePicker
                        selected={startdate}
                        onChange={(date) => this.handleStartdateChange(date)}
                        className="form-control"
                    />
                </div>
                <div className={'form-group'}>
                    <label htmlFor="enddate">End Date</label>
                    <DatePicker
                        selected={enddate}
                        onChange={(date) => this.handlEnddateChange(date)}
                        className="form-control"
                    />
                </div>
                {stocks.loading && <em>Loading stocks...</em>}
                {stocks.error && <span className="text-danger">ERROR: {stocks.error}</span>}
                {stocks.items && Array.isArray(stocks.items) &&
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Stock Price</th>
                                <th>DateTime</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks.items.map((stock, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{stock.stockPrice}</td>
                                            <td>{this.formatstockDate(stock.stockDate)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
                {stocks.items && stocks.items.length > 0 &&
                    <div>
                        <div className={'form-group'}>
                            <label htmlFor="min">Min:</label>
                            {stocks.items && stocks.items.length > 0 && Math.min.apply(Math, stocks.items.map(v => v.stockPrice))}
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="max">Max:</label>
                            {stocks.items && stocks.items.length > 0 && Math.max.apply(Math, stocks.items.map(v => v.stockPrice))}
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="avg">Avg:</label>
                            {stocks.items && stocks.items.length > 0 && stocks.items.map(v => v.stockPrice).reduce((a, b) => a + b, 0) / stocks.items.length}
                        </div>
                    </div>
                }
                 <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>);
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return { stocks: state.stockdetails, lstallcompanys: state.companys };

};
const actionCreators = {
    getstocks: stockActions.getById,
    getallcompanys: companyActions.getAll
}

const connectedStockDetailPage = connect(mapStateToProps, actionCreators)(StockDetailPage);
export { connectedStockDetailPage as StockDetailPage };