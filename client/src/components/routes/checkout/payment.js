// import React, {Component} from 'react';
// import log from 'loglevel';
// import {Grid} from "@material-ui/core";
// import ContinueButton from "./continueButton";
// import {withStyles} from "@material-ui/core/styles";
// import {reduxForm} from "redux-form";
// import {connect} from "react-redux";
// import {setPaymentInfo} from "../../../actions"
// import {
//     CardCvcElement,
//     CardNumberElement,
//     CardExpiryElement,
// } from "@stripe/react-stripe-js";
// import {StripeInput} from "./stripeInput";
// import {FormTextField} from "./formTextField";
// import {SummaryCard} from "./summaryCard";
// import {emailRule, requiredRule, zipCodeRule} from "../../../constants/formValidationRules";
// import {ModalConfirmation} from "../../ui/modalConfirmation";
// import {checkoutFormStyles} from "../../../styles/materialUI/checkoutFormStyles";
// import {labelTextFieldStyles} from "../../../styles/js/formStyles";
//
// class PaymentForm extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             paymentRemovalConfirmation: false
//         }
//     }
//
//     closeModalHandler = () => {
//         this.setState({paymentRemovalConfirmation: false})
//     }
//
//     removeConfirmedHandler = () => {
//         this.props.reset('paymentForm')
//         this.props.setPaymentInfo({values: null, submitted: false})
//         this.setState({paymentRemovalConfirmation: false})
//     }
//
//     editBtnHandler = () => {
//         this.props.setPaymentInfo({submitted: false})
//     }
//
//     deleteBtnHandler = () => {
//         this.setState({addressRemovalConfirmation: true})
//     }
//
//     onSubmitHandler = async (event) => {
//         // Block native form submission.
//         event.preventDefault();
//
//         const {stripe, elements} = this.props
//
//         if (!stripe || !elements) {
//             // Stripe.js has not loaded yet. Make sure to disable
//             // form submission until Stripe.js has loaded.
//             return;
//         }
//
//         // Get a reference to a mounted CardElement. Elements knows how
//         // to find your CardElement because there can only ever be one of
//         // each type of element.
//         const cardNumberElement = elements.getElement(CardNumberElement);
//
//         // Use your card Element with other Stripe.js APIs
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: 'card',
//             card: cardNumberElement,
//         });
//
//         if (error) {
//             console.log('[error]', error);
//             return
//         } else {
//             console.log('[PaymentMethod]', JSON.stringify(paymentMethod));
//         }
//
//         this.props.setPaymentInfo({
//             values: this.props.paymentFormStore.values,
//             card: {
//                 id: paymentMethod.id,
//                 brand: paymentMethod.card.brand,
//                 last4: paymentMethod.card.last4,
//                 exp_year: paymentMethod.card.exp_year,
//                 exp_month: paymentMethod.card.exp_month
//             },
//             submitted: true
//         })
//
//     };
//
//     render() {
//         const {classes, submitting, pristine} = this.props;
//
//         const renderPaymentCards = () => {
//             let cardValues = this.props.paymentInfo.card
//             let contentList = []
//
//             contentList.push(`${cardValues.brand.toUpperCase()} ending in ${cardValues.last4}`)
//             contentList.push(`Expires: ${cardValues.exp_month}/${cardValues.exp_year}`)
//
//             return (
//                 <Grid container justify="flex-start" style={{height: "fit-content", backgroundColor: "#80808033"}}>
//                     <SummaryCard contentList={contentList}
//                                  editBtnHandler={this.editBtnHandler}
//                                  deleteBtnHandler={this.deleteBtnHandler}/>
//                 </Grid>
//             )
//         }
//
//         const renderFormTextField = (label, name, validationRules) => {
//             return (
//                 <Grid item container xs={11} sm={8}>
//                     <FormTextField label={label} name={name}
//                                    validationRules={validationRules}/>
//                 </Grid>
//             )
//         }
//
//         const renderStripeTextField = (label, inputPropsComponent) => {
//             return (
//                 <TextField
//                     label={label}
//                     variant="outlined"
//                     fullWidth
//                     size="medium"
//                     style={labelTextFieldStyles}
//                     InputLabelProps={{shrink: true}}
//                     required
//                     InputProps={{
//                         inputComponent: StripeInput,
//                         "inputProps": {"component": inputPropsComponent}
//                     }}
//                 />
//             )
//         }
//
//         const renderPaymentForm = () => {
//
//             return (
//                 <Grid item style={{width: "100%", height: "fit-content"}}>
//                     <Grid item xs={12} sm={12}>
//                         <form onSubmit={this.onSubmitHandler} className={classes.root}
//                               style={{width: "inherit"}}>
//                             {renderFormTextField("Email", "email",
//                                 [requiredRule, emailRule])}
//
//                             <Grid item container xs={11} sm={8}>
//                                 {renderStripeTextField("Credit Card Number", CardNumberElement)}
//                             </Grid>
//
//                             <Grid item container xs={11} sm={8}>
//                                 <Grid item container xs={6} style={{paddingRight: 0}}>
//                                     {renderStripeTextField("Expiration Date", CardExpiryElement)}
//                                 </Grid>
//
//                                 <Grid item container xs={6}>
//                                     {renderStripeTextField("CVC", CardCvcElement)}
//                                 </Grid>
//
//                             </Grid>
//
//                             {renderFormTextField("Zip Code", "zipCode",
//                                 [requiredRule, zipCodeRule])}
//
//                             <ContinueButton type="submit" action={submitting || pristine}/>
//                         </form>
//                     </Grid>
//                 </Grid>
//             )
//         }
//
//         log.info(`[Payment] Rendering Payment Component...`)
//         return (
//             <>
//                 {this.props.paymentInfo.submitted ? renderPaymentCards() : renderPaymentForm()}
//
//                 {this.state.addressRemovalConfirmation ?
//                     <ModalConfirmation closeModalHandler={this.closeModalHandler}
//                                        removeConfirmedHandler={this.removeConfirmedHandler}
//                                        title="Remove Payment Information"
//                                        question="Are you sure you want to remove selected payment information?"/>
//                     : null}
//             </>
//         )
//     }
// }
//
// const mapStateToProps = (state) => {
//     return ({
//         paymentFormStore: state.form.paymentForm ?
//             state.form.paymentForm : null,
//         paymentInfo: state.paymentInfoReducer
//
//     })
// }
//
// const reduxWrapperForm = reduxForm({
//     form: 'paymentForm',
//     destroyOnUnmount: false
// })(PaymentForm);
//
// const connectWrapperForm = connect(mapStateToProps, {setPaymentInfo})(reduxWrapperForm);
//
// export default withStyles(checkoutFormStyles, {withTheme: true})(connectWrapperForm);