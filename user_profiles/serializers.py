from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['username']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer() # Nested serializer
    
    profile_picture = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'bio', 'profile_picture']

    def update(self, instance, validated_data):
        """
        Custom update method to handle nested User data.
        """
        # 1. Extract user data if present
        user_data = validated_data.pop('user', None)
        
        # 2. Update Profile fields (Bio, Image)
        instance.bio = validated_data.get('bio', instance.bio)
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data['profile_picture']
        instance.save()

        # 3. Update User fields (First Name, Last Name)
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.email = user_data.get('email', user.email) # Optional
            user.save()

        return instance