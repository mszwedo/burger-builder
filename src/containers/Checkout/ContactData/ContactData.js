import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from 'react-redux';

class ContactData extends Component {

   state = {
      orderForm: {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            valueType: 'name'
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            valueType: 'street'
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Zip Code'
            },
            value: '',
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5
            },
            valid: false,
            touched: false,
            valueType: 'zip code'
         },
         country: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Country'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            valueType: 'country'
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your Email'
            },
            value: '',
            validation: {
               required: true
            },
            valid: false,
            touched: false,
            valueType: 'email address'
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  {value: 'fatest', displayValue: 'Fastest'},
                  {value: 'cheapest', displayValue: 'Cheapest'}
               ]
            },
            value: 'fastest',
            validation: {},
            valid: true
         }
      },
      formIsValid: false,
      loading: false
   };

   orderHandler = (event) => {
      event.preventDefault();
      this.setState({loading: true});
      const formData = {};
      for (let formElementIdentifier in this.state.orderForm) {
         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
      }
      const order = {
         ingredients: this.props.ings,
         price: this.props.price,
         orderData: formData
      };
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
         })
         .catch(error => {
            this.setState({loading: false});
         });
   };

   checkValidity(value, rules) {
      let isValid = true;

      if (rules.required) {
         isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
         isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
   }

   inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {...this.state.orderForm};
      const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifiers in updatedOrderForm) {
         formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
      }

      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
   };

   render() {

      const formElementsArray = [];
      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key]
         });
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
               <Input
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  valueType={formElement.config.valueType}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
         </form>)
      ;
      if (this.state.loading) {
         form = <Spinner />
      }

      return (
         <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      ings: state.ingredients,
      price: state.totalPrice
   };
};

export default connect(mapStateToProps)(ContactData);