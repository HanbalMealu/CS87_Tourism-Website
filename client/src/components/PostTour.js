import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios';
import FormData from "form-data"
import './postToursForm.css'
import Sidebar from './Sidebar'

class  PostTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
          departure_city: null,
          arrival_city: null,
          departure_date: null,
          return_date: null,
          cost: null,
          details: null,
          days:7,
          empty: null,
          errors: {
            departure_city: '',
            arrival_city: '',
            departure_date: '',
            return_date: '',
            cost: '',
            details: '',
          }
        };
        this.submitHandler = this.submitHandler.bind(this);
      }

      depCity = event => {
        this.setState({ departure_city: event.target.value });
      };
    
      arrCity = event => {
        this.setState({ arrival_city: event.target.value });
      };

      depDate = event => {
        this.setState({ departure_date: event.target.value });
      };

      retDate = event => {
        this.setState({ return_date: event.target.value });
      };
    
      pricing = event => {
        this.setState({ cost: event.target.value });
      };
       
      detail = event => {
        this.setState({ details: event.target.value });
      };
      
      detailCheck(){ //empty field check for details
        const {details, empty} = this.state;
        let valid = true;

        if(details === empty){
            console.log('Details Should not be empty!!');
            valid = false;
        }else{
            console.log('Details OK!!');
            valid = true;
        }
            return valid;
      }
     costCheck(){ //empty field check for cost
         const {cost, empty} = this.state;
         let valid = true;
     
         if(cost === empty){
             console.log('Price Field Is Required!!');
             valid = false;
         }else{
            console.log('Price OK!!');
            valid = true;
         }
         return valid;
     }

      cityCheck(){  //arival and departure cities should not be equal
        const { departure_city, arrival_city} = this.state;
        let valid=true;
    
        if(departure_city === arrival_city||departure_city===this.state.empty||arrival_city===this.state.empty){
                    console.log('Departure And Arrival Cities Should be different and are required');
                    valid = false;
            
        }else{
            console.log('Cities OK!');
            valid = true;
        }
        return valid;
      }

      
        
      checkdepDate(){ //Departure should be bigger than today or day before
        const { departure_date } = this.state;
        var UserDate = departure_date;
        var ToDate = new Date();
        let valid = true;
        if (new Date(UserDate).getTime() <= ToDate.getTime()) {
              console.log('The  Departure Date must be Bigger than today date');
              valid = false;
         }else{
             console.log('Departure Date OK!')
             valid = true;
         }
        return valid;
      }
      
      checkDate(){  //Check: Arrival Date should be less than Departure Date
        const { departure_date , return_date} = this.state;
        var depDate = departure_date;
        var arrDate = return_date;
        let valid = true;
        
        if( (new Date(depDate).getTime() < new Date(arrDate).getTime()))
        {
            console.log('Dates Check Ok!');
            valid = true;
        }else{
            console.log('Dates Check ERROR!');
            valid=false;
        }
        return valid;
      }
      Days(ret,dep){
          var dep_date=new Date(dep)
           var ret_date=new Date(ret)

        var time = ret_date.getTime()-dep_date.getTime();
        var days=time/ (1000 * 3600 * 24);
        return days
    
     }

      emptyCityCheck(){
        const { departure_city, arrival_city ,empty} = this.state;
        let valid = true;

            if(departure_city === empty || arrival_city === empty){
                console.log('Departure or Arrival Are Missing!!');
                valid = false;
    
            }else{
                console.log('Cities Not Empty OK!');
                valid = true;
            }
        return valid;

      }

      validation(){
          let validInput = true;
          let emptyCityFlag = true;
          let cityCompareFlag = true;
          let dateCompareFlag = true;
          let depDateFlag = true;
          let costFlag = true;
          let detailsFlag = true;

           if(this.cityCheck() == true)
           {
               cityCompareFlag = true;
           } else{
               cityCompareFlag = false;
           }

           if(this.emptyCityCheck() == true){
               emptyCityFlag = true;
           }else{
               emptyCityFlag = false;
           }
           
           if(this.checkdepDate() == true){
               depDateFlag = true;
           }else{
               depDateFlag = false;
           }

           if(this.checkDate() == true){
               dateCompareFlag = true;
           }else{
               dateCompareFlag = false;
           }

           if(this.costCheck() == true){
               costFlag = true;
           }else{
               costFlag = false;
           }
          
           if(this.detailCheck() == true){
               detailsFlag = true;
           }else{
               detailsFlag = false;
           }            
          
           if(emptyCityFlag == true && cityCompareFlag == true && dateCompareFlag == true &&
              depDateFlag == true && costFlag == true && detailsFlag == true){
                  validInput = true;
              }else{
                  validInput = false;
              }

            return validInput
      }
      componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      id:decoded.id
      })

  
  }
      submitHandler = e =>{
        e.preventDefault()
        if(this.validation() == true){
            console.log('form submited')
            const formData = new FormData();   
            formData.append("file",  e.target.attachment.files[0])
            formData.append("departure_city", e.target.departure_city.value)
            formData.append("arrival_city", e.target.arrival_city.value)
            formData.append("departure_date", e.target.departure_date.value)
            formData.append("return_date", e.target.return_date.value)
            formData.append("cost", e.target.cost.value)
            formData.append("details", e.target.details.value)
            formData.append("touroperator_id", this.state.id)
            formData.append("days", this.Days(e.target.return_date.value,e.target.departure_date.value))
            axios.post('/trips/register',formData,
                
                {
                    headers: {
          
                        'content-type':"'multipart/form-data';"
                    }
                })
                .then(res => {
                  this.props.history.push(`/tours`)
                  if(res.data.status==="success"){
                      this.props.toggle();
                 
              }
              
          })
          .catch(function (error) {
            console.log(error);
          });
          
          }
          else {
            console.error("Invalid Form");
          }
        
        }
      
      
render() { 
    const {errors} = this.state;
  return (
        <div className="postPage">
            <div className="row">
                <div className="col-lg-3 col-xl-3">
                  <Sidebar />
                </div>
                <div className="col-lg-9 col-xl-9 col-sm-12 col-md-12 col-xs-12">
               <div className="container"> 
                <div className="postTourCard">
                <div className="dashBoardHeadings">Organize A Tour</div>
          <form onSubmit={this.submitHandler}>
          <div className="formData">
             <div className = "row">
                 <div className="col-sm-1 col-xl-3"></div>
                 
             </div>
            <div className="container">
             <div className="row">
                <div className="col-sm-6 col-lg-6 col-xl-6">
                <span className="registerLabel">Departure City</span>
                <select type="text" className="smallBox" name="departure_city" onChange={this.depCity} placeholder="Departure City" > 
                <option value="" disabled selected>Select The City</option>
                <option value="Swat">Swat</option> <option value="Islamabad">Islamabad</option>
	             <option value="Naran">Naran</option> 
	             <option value="Skardu">Skardu</option> 
	             <option value="Gilgit">Gilgit</option> 
	             <option value="Hunza Valley">Hunza Valley</option> 
	             <option value="Ghizer">Ghizer</option> 
	             <option value="Astore">Astore</option> 
	             <option value="Nagar">Nagar</option> 
	             <option value="Thallay Valley">Thallay Valley</option> 
	             <option value="Chilas">Chilas</option> 
	             <option value="Kharmang Valley">Kharmang Valley</option> 
	             <option value="Neelum Valley">Neelum valley</option> 
	             <option value="Muzaffarabad">Muzaffarabad</option> 
	             <option value="Khanpur Dam">Khanpur Dam</option> 
	             <option value="Arang Kel">Arang Kel</option>
                <option value="" disabled>Punjab Cities</option>
                <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                <option value="Ahmadpur East">Ahmadpur East</option>
                <option value="Ali Khan Abad">Ali Khan Abad</option>
                <option value="Alipur">Alipur</option>
                <option value="Arifwala">Arifwala</option>
                <option value="Attock">Attock</option>
                <option value="Bhera">Bhera</option>
                <option value="Bhalwal">Bhalwal</option>
                <option value="Bahawalnagar">Bahawalnagar</option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Bhakkar">Bhakkar</option>
                <option value="Burewala">Burewala</option>
                <option value="Chillianwala">Chillianwala</option>
                <option value="Chakwal">Chakwal</option>
                <option value="Chichawatni">Chichawatni</option>
                <option value="Chiniot">Chiniot</option>
                <option value="Chishtian">Chishtian</option>
                <option value="Daska">Daska</option>
                <option value="Darya Khan">Darya Khan</option>
                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                <option value="Dhaular">Dhaular</option>
                <option value="Dina">Dina</option>
                <option value="Dinga">Dinga</option>
                <option value="Dipalpur">Dipalpur</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Fateh Jhang">Fateh Jang</option>
                <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                <option value="Gojra">Gojra</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Gujrat">Gujrat</option>
                <option value="Gujar Khan">Gujar Khan</option>
                <option value="Hafizabad">Hafizabad</option>
                <option value="Haroonabad">Haroonabad</option>
                <option value="Hasilpur">Hasilpur</option>
                <option value="Haveli">Haveli</option>
                <option value="Lakha">Lakha</option>
                <option value="Jalalpur">Jalalpur</option>
                <option value="Jattan">Jattan</option>
                <option value="Jampur">Jampur</option>
                <option value="Jaranwala">Jaranwala</option>
                <option value="Jhang">Jhang</option>
                <option value="Jhelum">Jhelum</option>
                <option value="Kalabagh">Kalabagh</option>
                <option value="Karor Lal Esan">Karor Lal Esan</option>
                <option value="Kasur">Kasur</option>
                <option value="Kamalia">Kamalia</option>
                <option value="Kamoke">Kamoke</option>
                <option value="Khanewal">Khanewal</option>
                <option value="Khanpur">Khanpur</option>
                <option value="Kharian">Kharian</option>
                <option value="Khushab">Khushab</option>
                <option value="Kot Adu">Kot Adu</option>
                <option value="Jauharabad">Jauharabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Lalamusa">Lalamusa</option>
                <option value="Layyah">Layyah</option>
                <option value="Liaquat Pur">Liaquat Pur</option>
                <option value="Lodhran">Lodhran</option>
                <option value="Malakwal">Malakwal</option>
                <option value="Mamoori">Mamoori</option>
                <option value="Mailsi">Mailsi</option>
                <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                <option value="mian Channu">Mian Channu</option>
                <option value="Mianwali">Mianwali</option>
                <option value="Multan">Multan</option>
                <option value="Murree">Murree</option>
                <option value="Muridke">Muridke</option>
                <option value="Mianwali Bangla">Mianwali Bangla</option>
                <option value="Muzaffargarh">Muzaffargarh</option>
                <option value="Narowal">Narowal</option>
                <option value="Okara">Okara</option>
                <option value="Renala Khurd">Renala Khurd</option>
                <option value="Pakpattan">Pakpattan</option>
                <option value="Pattoki">Pattoki</option>
                <option value="Pir Mahal">Pir Mahal</option>
                <option value="Qaimpur">Qaimpur</option>
                <option value="Qila Didar Singh">Qila Didar Singh</option>
                <option value="Rabwah">Rabwah</option>
                <option value="Raiwind">Raiwind</option>
                <option value="Rajanpur">Rajanpur</option>
                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Sadiqabad">Sadiqabad</option>
                <option value="Safdarabad">Safdarabad</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Sangla Hill">Sangla Hill</option>
                <option value="Sarai Alamgir">Sarai Alamgir</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Shakargarh">Shakargarh</option>
                <option value="Sheikhupura">Sheikhupura</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Sohawa">Sohawa</option>
                <option value="Soianwala">Soianwala</option>
                <option value="Siranwali">Siranwali</option>
                <option value="Talagang">Talagang</option>
                <option value="Taxila">Taxila</option>
                <option value="Toba Tek  Singh">Toba Tek Singh</option>
                <option value="Vehari">Vehari</option>
                <option value="Wah Cantonment">Wah Cantonment</option>
                <option value="Wazirabad">Wazirabad</option>
                <option value="" disabled>Sindh Cities</option>
                <option value="Badin">Badin</option>
                <option value="Bhirkan">Bhirkan</option>
                <option value="Rajo Khanani">Rajo Khanani</option>
                <option value="Chak">Chak</option>
                <option value="Dadu">Dadu</option>
                <option value="Digri">Digri</option>
                <option value="Diplo">Diplo</option>
                <option value="Dokri">Dokri</option>
                <option value="Ghotki">Ghotki</option>
                <option value="Haala">Haala</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Islamkot">Islamkot</option>
                <option value="Jacobabad">Jacobabad</option>
                <option value="Jamshoro">Jamshoro</option>
                <option value="Jungshahi">Jungshahi</option>
                <option value="Kandhkot">Kandhkot</option>
                <option value="Kandiaro">Kandiaro</option>
                <option value="Karachi">Karachi</option>
                <option value="Kashmore">Kashmore</option>
                <option value="Keti Bandar">Keti Bandar</option>
                <option value="Khairpur">Khairpur</option>
                <option value="Kotri">Kotri</option>
                <option value="Larkana">Larkana</option>
                <option value="Matiari">Matiari</option>
                <option value="Mehar">Mehar</option>
                <option value="Mirpur Khas">Mirpur Khas</option>
                <option value="Mithani">Mithani</option>
                <option value="Mithi">Mithi</option>
                <option value="Mehrabpur">Mehrabpur</option>
                <option value="Moro">Moro</option>
                <option value="Nagarparkar">Nagarparkar</option>
                <option value="Naudero">Naudero</option>
                <option value="Naushahro Feroze">Naushahro Feroze</option>
                <option value="Naushara">Naushara</option>
                <option value="Nawabshah">Nawabshah</option>
                <option value="Nazimabad">Nazimabad</option>
                <option value="Qambar">Qambar</option>
                <option value="Qasimabad">Qasimabad</option>
                <option value="Ranipur">Ranipur</option>
                <option value="Ratodero">Ratodero</option>
                <option value="Rohri">Rohri</option>
                <option value="Sakrand">Sakrand</option>
                <option value="Sanghar">Sanghar</option>
                <option value="Shahbandar">Shahbandar</option>
                <option value="Shahdadkot">Shahdadkot</option>
                <option value="Shahdadpur">Shahdadpur</option>
                <option value="Shahpur Chakar">Shahpur Chakar</option>
                <option value="Shikarpaur">Shikarpaur</option>
                <option value="Sukkur">Sukkur</option>
                <option value="Tangwani">Tangwani</option>
                <option value="Tando Adam Khan">Tando Adam Khan</option>
                <option value="Tando Allahyar">Tando Allahyar</option>
                <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                <option value="Thatta">Thatta</option>
                <option value="Umerkot">Umerkot</option>
                <option value="Warah">Warah</option>
                <option value="" disabled>Khyber Cities</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Adezai">Adezai</option>
                <option value="Alpuri">Alpuri</option>
                <option value="Akora Khattak">Akora Khattak</option>
                <option value="Ayubia">Ayubia</option>
                <option value="Banda Daud Shah">Banda Daud Shah</option>
                <option value="Bannu">Bannu</option>
                <option value="Batkhela">Batkhela</option>
                <option value="Battagram">Battagram</option>
                <option value="Birote">Birote</option>
                <option value="Chakdara">Chakdara</option>
                <option value="Charsadda">Charsadda</option>
                <option value="Chitral">Chitral</option>
                <option value="Daggar">Daggar</option>
                <option value="Dargai">Dargai</option>
                <option value="Darya Khan">Darya Khan</option>
                <option value="dera Ismail Khan">Dera Ismail Khan</option>
                <option value="Doaba">Doaba</option>
                <option value="Dir">Dir</option>
                <option value="Drosh">Drosh</option>
                <option value="Hangu">Hangu</option>
                <option value="Haripur">Haripur</option>
                <option value="Karak">Karak</option>
                <option value="Kohat">Kohat</option>
                <option value="Kulachi">Kulachi</option>
                <option value="Lakki Marwat">Lakki Marwat</option>
                <option value="Latamber">Latamber</option>
                <option value="Madyan">Madyan</option>
                <option value="Mansehra">Mansehra</option>
                <option value="Mardan">Mardan</option>
                <option value="Mastuj">Mastuj</option>
                <option value="Mingora">Mingora</option>
                <option value="Nowshera">Nowshera</option>
                <option value="Paharpur">Paharpur</option>
                <option value="Pabbi">Pabbi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Saidu Sharif">Saidu Sharif</option>
                <option value="Shorkot">Shorkot</option>
                <option value="Shewa Adda">Shewa Adda</option>
                <option value="Swabi">Swabi</option>
                <option value="Swat">Swat</option>
                <option value="Tangi">Tangi</option>
                <option value="Tank">Tank</option>
                <option value="Thall">Thall</option>
                <option value="Timergara">Timergara</option>
                <option value="Tordher">Tordher</option>
                <option value="" disabled>Balochistan Cities</option>
                <option value="Awaran">Awaran</option>
                <option value="Barkhan">Barkhan</option>
                <option value="Chagai">Chagai</option>
                <option value="Dera Bugti">Dera Bugti</option>
                <option value="Gwadar">Gwadar</option>
                <option value="Harnai">Harnai</option>
                <option value="Jafarabad">Jafarabad</option>
                <option value="Jhal Magsi">Jhal Magsi</option>
                <option value="Kacchi">Kacchi</option>
                <option value="Kalat">Kalat</option>
                <option value="Kech">Kech</option>
                <option value="Kech">Kaghan</option>
                <option value="Kharan">Kharan</option>
                <option value="Khuzdar">Khuzdar</option>
                <option value="Killa Abdullah">Killa Abdullah</option>
                <option value="Killa Saifullah">Killa Saifullah</option>
                <option value="Kohlu">Kohlu</option>
                <option value="Lasbela">Lasbela</option>
                <option value="Lehri">Lehri</option>
                <option value="Loralai">Loralai</option>
                <option value="Mastung">Mastung</option>
                <option value="Musakhel">Musakhel</option>
                <option value="Nasirabad">Nasirabad</option>
                <option value="Nushki">Nushki</option>
                <option value="Kech">Naraan</option>
                <option value="Panjgur">Panjgur</option>
                <option value="Pishin valley">Pishin Valley</option>
                <option value="Quetta">Quetta</option>
                <option value="Sherani">Sherani</option>
                <option value="Sibi">Sibi</option>
                <option value="Sohbatpur">Sohbatpur</option>
                <option value="Washuk">Washuk</option>
                <option value="Zhob">Zhob</option>
                <option value="Ziarat">Ziarat</option>
  
              </select>  
                </div>
                <div className="col-sm-6 col-lg-6 col-xl-6">
                <span className="registerLabel">ArrivalCity</span>
                <select type="text" className="smallBox" name="arrival_city" onChange={this.arrCity} placeholder="Arrival City" >
                <option value="" disabled selected>Select The City</option>
                <option value="Swat">Swat</option> <option value="Islamabad">Islamabad</option>
	             <option value="Naran">Naran</option> 
	             <option value="Skardu">Skardu</option> 
	             <option value="Gilgit">Gilgit</option> 
	             <option value="Hunza Valley">Hunza Valley</option> 
	             <option value="Ghizer">Ghizer</option> 
	             <option value="Astore">Astore</option> 
	             <option value="Nagar">Nagar</option> 
	             <option value="Thallay Valley">Thallay Valley</option> 
	             <option value="Chilas">Chilas</option> 
	             <option value="Kharmang Valley">Kharmang Valley</option> 
	             <option value="Neelum Valley">Neelum valley</option> 
	             <option value="Muzaffarabad">Muzaffarabad</option> 
	             <option value="Khanpur Dam">Khanpur Dam</option> 
	             <option value="Arang Kel">Arang Kel</option>
                <option value="" disabled>Punjab Cities</option>
                <option value="Ahmed Nager Chatha">Ahmed Nager Chatha</option>
                <option value="Ahmadpur East">Ahmadpur East</option>
                <option value="Ali Khan Abad">Ali Khan Abad</option>
                <option value="Alipur">Alipur</option>
                <option value="Arifwala">Arifwala</option>
                <option value="Attock">Attock</option>
                <option value="Bhera">Bhera</option>
                <option value="Bhalwal">Bhalwal</option>
                <option value="Bahawalnagar">Bahawalnagar</option>
                <option value="Bahawalpur">Bahawalpur</option>
                <option value="Bhakkar">Bhakkar</option>
                <option value="Burewala">Burewala</option>
                <option value="Chillianwala">Chillianwala</option>
                <option value="Chakwal">Chakwal</option>
                <option value="Chichawatni">Chichawatni</option>
                <option value="Chiniot">Chiniot</option>
                <option value="Chishtian">Chishtian</option>
                <option value="Daska">Daska</option>
                <option value="Darya Khan">Darya Khan</option>
                <option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
                <option value="Dhaular">Dhaular</option>
                <option value="Dina">Dina</option>
                <option value="Dinga">Dinga</option>
                <option value="Dipalpur">Dipalpur</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Fateh Jhang">Fateh Jang</option>
                <option value="Ghakhar Mandi">Ghakhar Mandi</option>
                <option value="Gojra">Gojra</option>
                <option value="Gujranwala">Gujranwala</option>
                <option value="Gujrat">Gujrat</option>
                <option value="Gujar Khan">Gujar Khan</option>
                <option value="Hafizabad">Hafizabad</option>
                <option value="Haroonabad">Haroonabad</option>
                <option value="Hasilpur">Hasilpur</option>
                <option value="Haveli">Haveli</option>
                <option value="Lakha">Lakha</option>
                <option value="Jalalpur">Jalalpur</option>
                <option value="Jattan">Jattan</option>
                <option value="Jampur">Jampur</option>
                <option value="Jaranwala">Jaranwala</option>
                <option value="Jhang">Jhang</option>
                <option value="Jhelum">Jhelum</option>
                <option value="Kalabagh">Kalabagh</option>
                <option value="Karor Lal Esan">Karor Lal Esan</option>
                <option value="Kasur">Kasur</option>
                <option value="Kamalia">Kamalia</option>
                <option value="Kamoke">Kamoke</option>
                <option value="Khanewal">Khanewal</option>
                <option value="Khanpur">Khanpur</option>
                <option value="Kharian">Kharian</option>
                <option value="Khushab">Khushab</option>
                <option value="Kot Adu">Kot Adu</option>
                <option value="Jauharabad">Jauharabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Lalamusa">Lalamusa</option>
                <option value="Layyah">Layyah</option>
                <option value="Liaquat Pur">Liaquat Pur</option>
                <option value="Lodhran">Lodhran</option>
                <option value="Malakwal">Malakwal</option>
                <option value="Mamoori">Mamoori</option>
                <option value="Mailsi">Mailsi</option>
                <option value="Mandi Bahauddin">Mandi Bahauddin</option>
                <option value="mian Channu">Mian Channu</option>
                <option value="Mianwali">Mianwali</option>
                <option value="Multan">Multan</option>
                <option value="Murree">Murree</option>
                <option value="Muridke">Muridke</option>
                <option value="Mianwali Bangla">Mianwali Bangla</option>
                <option value="Muzaffargarh">Muzaffargarh</option>
                <option value="Narowal">Narowal</option>
                <option value="Okara">Okara</option>
                <option value="Renala Khurd">Renala Khurd</option>
                <option value="Pakpattan">Pakpattan</option>
                <option value="Pattoki">Pattoki</option>
                <option value="Pir Mahal">Pir Mahal</option>
                <option value="Qaimpur">Qaimpur</option>
                <option value="Qila Didar Singh">Qila Didar Singh</option>
                <option value="Rabwah">Rabwah</option>
                <option value="Raiwind">Raiwind</option>
                <option value="Rajanpur">Rajanpur</option>
                <option value="Rahim Yar Khan">Rahim Yar Khan</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Sadiqabad">Sadiqabad</option>
                <option value="Safdarabad">Safdarabad</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Sangla Hill">Sangla Hill</option>
                <option value="Sarai Alamgir">Sarai Alamgir</option>
                <option value="Sargodha">Sargodha</option>
                <option value="Shakargarh">Shakargarh</option>
                <option value="Sheikhupura">Sheikhupura</option>
                <option value="Sialkot">Sialkot</option>
                <option value="Sohawa">Sohawa</option>
                <option value="Soianwala">Soianwala</option>
                <option value="Siranwali">Siranwali</option>
                <option value="Talagang">Talagang</option>
                <option value="Taxila">Taxila</option>
                <option value="Toba Tek  Singh">Toba Tek Singh</option>
                <option value="Vehari">Vehari</option>
                <option value="Wah Cantonment">Wah Cantonment</option>
                <option value="Wazirabad">Wazirabad</option>
                <option value="" disabled>Sindh Cities</option>
                <option value="Badin">Badin</option>
                <option value="Bhirkan">Bhirkan</option>
                <option value="Rajo Khanani">Rajo Khanani</option>
                <option value="Chak">Chak</option>
                <option value="Dadu">Dadu</option>
                <option value="Digri">Digri</option>
                <option value="Diplo">Diplo</option>
                <option value="Dokri">Dokri</option>
                <option value="Ghotki">Ghotki</option>
                <option value="Haala">Haala</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Islamkot">Islamkot</option>
                <option value="Jacobabad">Jacobabad</option>
                <option value="Jamshoro">Jamshoro</option>
                <option value="Jungshahi">Jungshahi</option>
                <option value="Kandhkot">Kandhkot</option>
                <option value="Kandiaro">Kandiaro</option>
                <option value="Karachi">Karachi</option>
                <option value="Kashmore">Kashmore</option>
                <option value="Keti Bandar">Keti Bandar</option>
                <option value="Khairpur">Khairpur</option>
                <option value="Kotri">Kotri</option>
                <option value="Larkana">Larkana</option>
                <option value="Matiari">Matiari</option>
                <option value="Mehar">Mehar</option>
                <option value="Mirpur Khas">Mirpur Khas</option>
                <option value="Mithani">Mithani</option>
                <option value="Mithi">Mithi</option>
                <option value="Mehrabpur">Mehrabpur</option>
                <option value="Moro">Moro</option>
                <option value="Nagarparkar">Nagarparkar</option>
                <option value="Naudero">Naudero</option>
                <option value="Naushahro Feroze">Naushahro Feroze</option>
                <option value="Naushara">Naushara</option>
                <option value="Nawabshah">Nawabshah</option>
                <option value="Nazimabad">Nazimabad</option>
                <option value="Qambar">Qambar</option>
                <option value="Qasimabad">Qasimabad</option>
                <option value="Ranipur">Ranipur</option>
                <option value="Ratodero">Ratodero</option>
                <option value="Rohri">Rohri</option>
                <option value="Sakrand">Sakrand</option>
                <option value="Sanghar">Sanghar</option>
                <option value="Shahbandar">Shahbandar</option>
                <option value="Shahdadkot">Shahdadkot</option>
                <option value="Shahdadpur">Shahdadpur</option>
                <option value="Shahpur Chakar">Shahpur Chakar</option>
                <option value="Shikarpaur">Shikarpaur</option>
                <option value="Sukkur">Sukkur</option>
                <option value="Tangwani">Tangwani</option>
                <option value="Tando Adam Khan">Tando Adam Khan</option>
                <option value="Tando Allahyar">Tando Allahyar</option>
                <option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
                <option value="Thatta">Thatta</option>
                <option value="Umerkot">Umerkot</option>
                <option value="Warah">Warah</option>
                <option value="" disabled>Khyber Cities</option>
                <option value="Abbottabad">Abbottabad</option>
                <option value="Adezai">Adezai</option>
                <option value="Alpuri">Alpuri</option>
                <option value="Akora Khattak">Akora Khattak</option>
                <option value="Ayubia">Ayubia</option>
                <option value="Banda Daud Shah">Banda Daud Shah</option>
                <option value="Bannu">Bannu</option>
                <option value="Batkhela">Batkhela</option>
                <option value="Battagram">Battagram</option>
                <option value="Birote">Birote</option>
                <option value="Chakdara">Chakdara</option>
                <option value="Charsadda">Charsadda</option>
                <option value="Chitral">Chitral</option>
                <option value="Daggar">Daggar</option>
                <option value="Dargai">Dargai</option>
                <option value="Darya Khan">Darya Khan</option>
                <option value="dera Ismail Khan">Dera Ismail Khan</option>
                <option value="Doaba">Doaba</option>
                <option value="Dir">Dir</option>
                <option value="Drosh">Drosh</option>
                <option value="Hangu">Hangu</option>
                <option value="Haripur">Haripur</option>
                <option value="Karak">Karak</option>
                <option value="Kohat">Kohat</option>
                <option value="Kulachi">Kulachi</option>
                <option value="Lakki Marwat">Lakki Marwat</option>
                <option value="Latamber">Latamber</option>
                <option value="Madyan">Madyan</option>
                <option value="Mansehra">Mansehra</option>
                <option value="Mardan">Mardan</option>
                <option value="Mastuj">Mastuj</option>
                <option value="Mingora">Mingora</option>
                <option value="Nowshera">Nowshera</option>
                <option value="Paharpur">Paharpur</option>
                <option value="Pabbi">Pabbi</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Saidu Sharif">Saidu Sharif</option>
                <option value="Shorkot">Shorkot</option>
                <option value="Shewa Adda">Shewa Adda</option>
                <option value="Swabi">Swabi</option>
                <option value="Swat">Swat</option>
                <option value="Tangi">Tangi</option>
                <option value="Tank">Tank</option>
                <option value="Thall">Thall</option>
                <option value="Timergara">Timergara</option>
                <option value="Tordher">Tordher</option>
                <option value="" disabled>Balochistan Cities</option>
                <option value="Awaran">Awaran</option>
                <option value="Barkhan">Barkhan</option>
                <option value="Chagai">Chagai</option>
                <option value="Dera Bugti">Dera Bugti</option>
                <option value="Gwadar">Gwadar</option>
                <option value="Harnai">Harnai</option>
                <option value="Jafarabad">Jafarabad</option>
                <option value="Jhal Magsi">Jhal Magsi</option>
                <option value="Kacchi">Kacchi</option>
                <option value="Kalat">Kalat</option>
                <option value="Kech">Kech</option>
                <option value="Kharan">Kharan</option>
                <option value="Khuzdar">Khuzdar</option>
                <option value="Killa Abdullah">Killa Abdullah</option>
                <option value="Killa Saifullah">Killa Saifullah</option>
                <option value="Kohlu">Kohlu</option>
                <option value="Lasbela">Lasbela</option>
                <option value="Lehri">Lehri</option>
                <option value="Loralai">Loralai</option>
                <option value="Mastung">Mastung</option>
                <option value="Musakhel">Musakhel</option>
                <option value="Nasirabad">Nasirabad</option>
                <option value="Nushki">Nushki</option>
                <option value="Panjgur">Panjgur</option>
                <option value="Pishin valley">Pishin Valley</option>
                <option value="Quetta">Quetta</option>
                <option value="Sherani">Sherani</option>
                <option value="Sibi">Sibi</option>
                <option value="Sohbatpur">Sohbatpur</option>
                <option value="Washuk">Washuk</option>
                <option value="Zhob">Zhob</option>
                <option value="Ziarat">Ziarat</option>
            </select>
                </div>
                <span className='error'>{errors.arrival_city}</span>
             </div>
             <br />
            <div className="row">
                <div className="col-sm-6 col-lg-6 col-xl-6">
                <span className="registerLabel">DepartureDate</span><input type="date" className="smallBox" id="departure" name="departure_date" onChange={this.depDate} placeholder="" />
                </div>
                <div className="col-sm-6 col-lg-6 col-xl-6">
                <span className="registerLabel">ReturnDate</span><input type="date" className="smallBox" id="return" name="return_date" onChange={this.retDate} placeholder="" />
                </div>

            </div>
            <br /> 
            <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12">
                <span className="registerLabel">Cost</span><input type="number" className="smallBox" name="cost" min="1000" onChange={this.pricing} placeholder="Cost Per Head" />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12">
                <span className="registerLabel">Details</span><textarea type="text" className="smallBox" name="details" onChange={this.detail} placeholder="" />     
                </div>
            </div>
                <div className="form-group">
                    <span className="registerLabel">Upload Picture</span>
                    <input type="file"  name="attachment" className="form-control-file" id="exampleFormControlFile1" />
                </div>
             
                <div className="row">
                    <div className="col-md-0 col-xs-0 col-sm-0 col-lg-6 col-xl-6"></div>
                    <div className="col-sm-6 col-xs-6 col-md-6 col-lg-3 col-xl-3">
                      <button type="submit" className="tourSubmit">Post Tour</button>
                    </div>
                    <div className="col-sm-6 col-xs-6 col-md-6 col-lg-3 col-xl-3">
                      <Link to="/profile">
                      <button type="reset" className="tourSubmit">Cancel</button>
                      </Link>
                    </div>
                </div>
             
            </div>
           
            </div>
      </form>
      </div>
                </div>
                </div>
            </div>
        </div>
  )  
}
}
export default PostTour