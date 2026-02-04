<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MpesaController extends Controller
{
    public function generateToken()
    {
        $consumerKey = env('MPESA_CONSUMER_KEY');
        $consumerSecret = env('MPESA_CONSUMER_SECRET');

        $response = Http::withBasicAuth($consumerKey, $consumerSecret)
            ->get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');

        return $response->json()['access_token'];
    }

    public function stkPush(Request $request)
    {
        return $this->processStkPush($request->phone, $request->amount);
    }

    public function processStkPush($phoneNumber, $amount)
    {
        $timestamp = now()->format('YmdHis');
        $password = base64_encode(env('MPESA_SHORTCODE') . env('MPESA_PASSKEY') . $timestamp);

        try {
            $response = Http::withToken($this->generateToken())
                ->post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', [
                    'BusinessShortCode' => env('MPESA_SHORTCODE'),
                    'Password' => $password,
                    'Timestamp' => $timestamp,
                    'TransactionType' => 'CustomerPayBillOnline',
                    'Amount' => $amount,
                    'PartyA' => $phoneNumber,
                    'PartyB' => env('MPESA_SHORTCODE'),
                    'PhoneNumber' => $phoneNumber,
                    'CallBackURL' => env('MPESA_CALLBACK_URL'),
                    'AccountReference' => 'ApexSolutions',
                    'TransactionDesc' => 'Payment for Apex Merchandise'
                ]);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Mpesa STK Push Error: ' . $e->getMessage());
            return ['ResponseCode' => '1', 'CustomerMessage' => 'Failed to initiate payment'];
        }
    }

    public function callback(Request $request)
    {
        $data = $request->all();
        Log::info('Mpesa Callback Received', $data);

        $resultCode = $data['Body']['stkCallback']['ResultCode'];

        if ($resultCode == 0) {
            // Logic to update your 'orders' table to 'paid'
            // Use the CheckoutRequestID to find the specific order
        }

        return response()->json(['ResultCode' => 0, 'ResultDesc' => 'Success']);
    }
}