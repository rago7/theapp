from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken  # Import JWT tokens
from django.contrib.auth import authenticate
from core.serializers.users import SignupSerializer, LoginSerializer
from faker import Faker
import random
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Save the user using the serializer
            # Generate JWT tokens for the new user
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),  # Access token
                'refresh': str(refresh),  # Refresh token
                'message': 'User registered successfully!'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)  # Authenticate user
            if user:
                # Generate JWT tokens for the authenticated user
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),  # Access token
                    'refresh': str(refresh),  # Refresh token
                    'message': 'Login successful!'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Endpoint to get random users (for testing purposes)
fake = Faker()

def get_users(request):
    users = []
    for i in range(10):  # Generate 10 random users
        user = {
            "userID": f"user{str(i).zfill(3)}",  # Unique user ID
            "name": fake.name(),
            "email": fake.email(),
            "gender": random.choice(["male", "female"]),
            "profilePicture": fake.image_url(),  # Placeholder profile picture URL
            "university": f"University {random.randint(1, 5)}",
            "verified": random.choice([True, False]),
        }
        users.append(user)
    return JsonResponse(users, safe=False)  # Return the users as JSON response


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    user = request.user
    data = request.data

    # Update editable fields
    user.fname = data.get("fname", user.fname)
    user.lname = data.get("lname", user.lname)
    user.gender = data.get("gender", user.gender)
    user.university = data.get("university", user.university)
    user.account_type = data.get("account_type", user.account_type)
    user.save()

    return Response({
        "message": "Profile updated successfully.",
        "profile": {
            "uuid": user.uuid,
            "fname": user.fname,
            "lname": user.lname,
            "email": user.email,
            "gender": user.gender,
            "dob": user.dob,
            "university": user.university,
            "account_type": user.account_type,
            "profile_pic_url": user.profile_pic_url,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        "uuid": user.uuid,
        "fname": user.fname,
        "lname": user.lname,
        "email": user.email,
        "gender": user.gender,
        "dob": user.dob,
        "university": user.university,
        "account_type": user.account_type,
    })
