import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reviews = ({ route }) => {
  const { product } = route.params || {};
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const savedReviews = await AsyncStorage.getItem('reviews');
        if (savedReviews) {
          setReviews(JSON.parse(savedReviews));
        }
      } catch (error) {
        console.error('Failed to load reviews', error);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    const saveReviews = async () => {
      try {
        await AsyncStorage.setItem('reviews', JSON.stringify(reviews));
      } catch (error) {
        console.error('Failed to save reviews', error);
      }
    };

    saveReviews();
  }, [reviews]);

  const handleRatingPress = (rate) => {
    setRating(rate);
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Review Failed',
        text2: 'Please enter a review text.',
      });
      return;
    }

    const newReview = {
      id: Date.now().toString(), 
      author: 'You', 
      text: reviewText,
      rating: rating,
    };

    setReviews((prevReviews) => [newReview, ...prevReviews]);
    setReviewText('');
    setRating(0);

    Toast.show({
      type: 'success',
      text1: 'Review Submitted',
      text2: `Your review with ${rating} stars has been submitted.`,
    });
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <Text style={styles.reviewAuthor}>{item.author}</Text>
      <Text style={styles.reviewText}>{item.text}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating} ★</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIcon}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Reviews</Text>
      </View>
      <View style={styles.reviewInputContainer}>
        <Text style={styles.sectionTitle}>Rate & Review</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRatingPress(star)}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={24}
                color={star <= rating ? '#ff6347' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Write your review here..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews from Others</Text>
        {reviews.length > 0 ? (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReviewItem}
            contentContainerStyle={styles.reviewsList}
          />
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  goBackIcon: {
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  reviewInputContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewsSection: {
    marginTop: 20,
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
  },
  noReviewsText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default Reviews;
