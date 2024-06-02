import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box, Card, CardContent, Divider, Typography, Avatar, Input, IconButton } from '@mui/material';
import TextField from 'ui-component/common/TextField';
import { IconBuildingBank, IconPencil, IconUser } from '@tabler/icons';
import User1 from 'assets/images/users/5856.jpg';

import { getUserMe, } from 'module/vendor/container/userContainer/slice';


import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

function Index() {
    const theme = useTheme();
    const style = commonStyles(theme);

    const dispatch = useDispatch();

    const userMeDataDe = useSelector((state) => state.data.user.userMeData);
    useEffect(() => {
        dispatch(getUserMe());
        console.log('=======userMeData=======', userMeDataDe);
    }, [dispatch]);


    // const initialValues = {
    //     imgUrl: profileDetails?.imgUrl || '',
    //     // ------------------------------
    // fName: profileDetails?.fName || '',
    // lName: profileDetails?.lName || '',
    // mobileNo: profileDetails?.mobileNo || '',
    // email: profileDetails?.email || '',
    //     // -------------------------------
    //     contactMobile1: profileDetails?.contactMobile1 || '',
    //     contactMobile2: profileDetails?.contactMobile2 || '',
    //     Country: profileDetails?.Country || '',
    //     State: profileDetails?.State || '',
    //     District: profileDetails?.District || '',
    //     City: profileDetails?.City || '',
    //     Region: profileDetails?.Region || '',
    //     LandMark: profileDetails?.landmark || '',
    //     addr1: profileDetails?.addr1 || '',
    //     addr2: profileDetails?.addr2 || '',
    //     Pincode: profileDetails?.postalCode || '',
    //     BankName: profileDetails?.BankName || '',
    //     AccountantName: profileDetails?.AccountantName || '',
    //     AccountType: profileDetails?.AccountType || '',
    //     AccountNo: profileDetails?.AccountNo || '',
    //     BranchName: profileDetails?.BranchName || '',
    //     BranchAddress: profileDetails?.BranchAddress || '',
    //     IFSCCode: profileDetails?.IFSCCode || '',
    //     UPIId: profileDetails?.upiId || '',
    //     CreditPeriod: profileDetails?.crdtPeriod || '',
    //     CreditLimit: profileDetails?.CreditLimit || ''
    // };

    const initialValues = {
        imgUrl: '',
        // ------------------------------
        fName: profileDetails?.fName || '',
        lName: profileDetails?.lName || '',
        mobileNo: profileDetails?.mobileNo || '',
        email: profileDetails?.email || '',
        // -------------------------------
        // contactMobile1:  '',
        contactMobile2: '',
        Country: '',
        State: '',
        District: '',
        City: '',
        Region: '',
        LandMark: '',
        addr1: '',
        addr2: '',
        Pincode: '',
        BankName: '',
        AccountantName: '',
        AccountType: '',
        AccountNo: '',
        BranchName: '',
        BranchAddress: '',
        IFSCCode: '',
        UPIId: '',
        CreditPeriod: '',
        CreditLimit: ''
    };

    const validationSchema = Yup.object({
        imgUrl: Yup.string().required('Profile Photo is Required'),
        // ------------------------------
        fName: Yup.string().required('Frist Name is Required'),
        lName: Yup.string().required('Last Name is Required'),
        mobileNo: Yup.string().required('Contact Mobile 1 is Required'),
        email: Yup.string().required('Email is Required'),
        // -------------------------------
        // contactMobile1: Yup.string().required('Contact Mobile 1 is Required'),
        contactMobile2: Yup.string().required('Contact Mobile 2 is Required'),
        Country: Yup.string().required('Country is Required'),
        State: Yup.string().required('State is Required'),
        District: Yup.string().required('District is Required'),
        City: Yup.string().required('City is Required'),
        Region: Yup.string().required('Region is Required'),
        LandMark: Yup.string().required('Land Mark is Required'),
        addr1: Yup.string().required('Address Line 1 is Required'),
        addr2: Yup.string().required('Address Line 2 is Required'),
        Pincode: Yup.string().required('Pincode is Required'),
        BankName: Yup.string().required('Bank Name is Required'),
        AccountantName: Yup.string().required('Accountant Name is Required'),
        AccountType: Yup.string().required('Account Type is Required'),
        AccountNo: Yup.string().required('Account Number is Required'),
        BranchName: Yup.string().required('Branch Name is Required'),
        BranchAddress: Yup.string().required('Branch Address is Required'),
        IFSCCode: Yup.string().required('IFSC Code is Required'),
        UPIId: Yup.string().required('UPI Id is Required'),
        CreditPeriod: Yup.string().required('Credit Period is Required'),
        CreditLimit: Yup.string().required('Credit Limit is Required')
    });

    const onSubmit = (values) => {
        dispatch(updateProfile({ userId: userData.userId, profileData: values }));
        dispatch(updateBankDetails({ userId: userData.userId, bankData: values }));
    };

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        } else {
            setSelectedImage(null);
        }
    };

    return (
        <Box>
            <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
                <Card>
                    <CardContent className="photocontent">
                        <Typography variant="h4" className="textcontent">
                            <IconUser className="textcontenticon" /> Profile
                        </Typography>
                    </CardContent>
                    <Divider />

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
                        <Form>
                            <Grid container spacing={2} className="textcard">
                                <Grid item xs={12} sm={6} md={4}>
                                    <Grid container>

                                        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: "flex-end" }}>
                                            <div>
                                                <Avatar src={selectedImage || User1} style={{ height: '110px', width: '110px' }} />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: "flex-start", alignItems: 'flex-end', position: "relative", right: "31px" }}>
                                            <Input type="file" name="imgUrls" id="imgUrls" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                            <label htmlFor="imgUrls">
                                                <IconButton variant="contained" style={{ backgroundColor: '#000', color: 'white' }}>
                                                    <IconPencil />
                                                </IconButton>
                                            </label>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                {/* ------------------------------------------------------------------------------------------------ */}
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Frist Name</Typography>
                                    <Field type="text" name="fName" id="fName" placeholder="Frist Name" as={TextField} />
                                    <ErrorMessage
                                        name="fName"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Last Name</Typography>
                                    <Field type="text" name="lName" id="lName" placeholder="Last Name" as={TextField} />
                                    <ErrorMessage
                                        name="lName"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Email</Typography>
                                    <Field type="text" name="email" id="email" placeholder="Email" as={TextField} />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Contact</Typography>
                                    <Field type="text" name="mobileNo" id="mobileNo" placeholder="Contact" as={TextField} />
                                    <ErrorMessage
                                        name="mobileNo"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                {/* ------------------------------------------------------------------------------------------------ */}

                                {/* <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Contact Mobile 1</Typography>
                                    <Field type="text" name="contactMobile1" id="contactMobile1" placeholder="Contact Mobile 1" as={TextField} />
                                    <ErrorMessage
                                        name="contactMobile1"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid> */}

                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Contact Mobile 2</Typography>
                                    <Field type="text" name="contactMobile2" id="contactMobile2" placeholder="Contact Mobile 2" as={TextField} />
                                    <ErrorMessage
                                        name="contactMobile2"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Country</Typography>
                                    <Field type="text" name="Country" id="Country" placeholder="Country" as={TextField} />
                                    <ErrorMessage
                                        name="Country"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>State</Typography>
                                    <Field type="text" name="State" id="State" placeholder="State" as={TextField} />
                                    <ErrorMessage
                                        name="State"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>District</Typography>
                                    <Field type="text" name="District" id="District" placeholder="District" as={TextField} />
                                    <ErrorMessage
                                        name="District"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>City</Typography>
                                    <Field type="text" name="City" id="City" placeholder="City" as={TextField} />
                                    <ErrorMessage
                                        name="City"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Region</Typography>
                                    <Field type="text" name="Region" id="Region" placeholder="Region" as={TextField} />
                                    <ErrorMessage
                                        name="Region"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Land Mark</Typography>
                                    <Field type="text" name="Land Mark" id="Land Mark" placeholder="Land Mark" as={TextField} />
                                    <ErrorMessage
                                        name="Land Mark"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Address Line 1</Typography>
                                    <Field type="text" name="addr1" id="addr1" placeholder="Address Line 1" as={TextField} />
                                    <ErrorMessage
                                        name="addr1"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Address Line 2</Typography>
                                    <Field type="text" name="addr2" id="addr2" placeholder="Address Line 2" as={TextField} />
                                    <ErrorMessage
                                        name="addr2"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Typography>Pincode</Typography>
                                    <Field type="text" name="Pincode" id="Pincode" placeholder="Pincode" as={TextField} />
                                    <ErrorMessage
                                        name="Pincode"
                                        component="div"
                                        style={{
                                            color: '#f54d4f',
                                            fontSize: 12,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            bottom: '5px'
                                        }}
                                    />
                                </Grid>
                            </Grid>


                            <Grid item md={12}>
                                <CardContent className="photocontent">
                                    <Typography variant="h4" className="textcontent">
                                        <IconBuildingBank className="textcontenticon" /> Bank Details
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <Grid container spacing={2} className="textcard">

                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography>BankName</Typography>
                                        <Field type="text" name="BankName" id="BankName" placeholder="BankName" as={TextField} />
                                        <ErrorMessage
                                            name="contactMobile1"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Accountant Name</Typography>
                                        <Field type="text" placeholder="Accountant Name" id="AccountantName" name="AccountantName" as={TextField} />
                                        <ErrorMessage
                                            name="AccountantName"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Account </Typography>
                                        <Field type="text" placeholder="Account Type" id="AccountType" name="AccountType" as={TextField} />
                                        <ErrorMessage
                                            name="AccountType"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Account Number</Typography>
                                        <Field type="number" placeholder="Account Number" id="AccountNo" name="AccountNo" as={TextField} />
                                        <ErrorMessage
                                            name="AccountNo"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Branch Name</Typography>
                                        <Field type="text" placeholder="Branch Name" id="BranchName" name="BranchName" as={TextField} />
                                        <ErrorMessage
                                            name="BranchName"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Branch Address</Typography>
                                        <Field type="text" placeholder="Branch Address" id="BranchAddress" name="BranchAddress" as={TextField} />
                                        <ErrorMessage
                                            name="BranchAddress"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>IFSC Code</Typography>
                                        <Field type="text" placeholder="IFSC Code" id="IFSCCode" name="IFSCCode" as={TextField} />
                                        <ErrorMessage
                                            name="IFSCCode"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>UPI Id</Typography>
                                        <Field type="text" placeholder="UPI Id" id="UPIId" name="UPIId" as={TextField} />
                                        <ErrorMessage
                                            name="UPIId"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Credit Period</Typography>
                                        <Field type="text" placeholder="Credit Period" id="CreditPeriod" name="CreditPeriod" as={TextField} />
                                        <ErrorMessage
                                            name="CreditPeriod"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography>Credit Limit</Typography>
                                        <Field type="text" placeholder="Credit Limit" id="CreditLimit" name="CreditLimit" as={TextField} />
                                        <ErrorMessage
                                            name="CreditLimit"
                                            component="div"
                                            style={{
                                                color: '#f54d4f',
                                                fontSize: 12,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                bottom: '5px'
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={12} className="password-btn">
                                        <Button type="submit" sx={style.changeBtn}>
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Card>
            </Grid>
        </Box>
    );
}

export default Index;