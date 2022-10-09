import React from 'react';
import {View, ScrollView, Text, TextInput} from 'react-native';
import AppButton from '../../components/Button';
import Screen from '../../components/Screen';
import colors from '../../config/colors';
function TherapistPlaneofCare(props) {
  return (
    <Screen>
      <ScrollView>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
            fontWeight: '400',
          }}>
          Becoming a patient
        </Text>
        <View style={{marginHorizontal: 20}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 14,
              fontWeight: '400',
            }}>
            Patients are accepted for care only when there is a good opportunity
            for help and/or recovery. I am dedicated to providing you with the
            highest quality mental health services. Each Patient’s results may
            vary although best results can be achieved with active engagement
            and practice of interventions provided between sessions and
            completing the recommended course of treatment.
          </Text>
        </View>
        <View style={{marginHorizontal: 30, marginTop: '5%'}}>
          <TextInput
            style={{
              backgroundColor: colors.backGrey,
              borderRadius: 10,
              padding: 10,
            }}
            placeholderTextColor={'#000'}
            placeholder="Your Situation/Condition"
          />
        </View>
        <View style={{marginHorizontal: 30, marginTop: '2%'}}>
          <TextInput
            style={{
              backgroundColor: colors.backGrey,
              borderRadius: 10,
              padding: 10,
            }}
            placeholderTextColor={'#000'}
            placeholder="Goals"
          />
        </View>
        <View style={{marginHorizontal: 30, marginTop: '2%'}}>
          <TextInput
            style={{
              backgroundColor: colors.backGrey,
              borderRadius: 10,
              padding: 10,
            }}
            placeholderTextColor={'#000'}
            placeholder="Measues"
          />
        </View>
        <View style={{marginHorizontal: 30, marginTop: '2%'}}>
          <TextInput
            style={{
              backgroundColor: colors.backGrey,
              borderRadius: 10,
              padding: 10,
            }}
            placeholderTextColor={'#000'}
            placeholder="Unique Circumstances"
          />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: '#000',
            fontSize: 24,
            fontWeight: '300',
            marginVertical: '5%',
          }}>
          PLAN OF CARE
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.backGrey,
            margin: 30,
            marginTop: 0,
            padding: 30,
            borderRadius: 10,
          }}>
          <Text style={{color: '#000'}}>DATE: 16.02.2021</Text>
          <Text style={{marginTop: 10, color: '#000'}}>
            Good progress is made in stages. You will need to work through some
            or all of the stages to give yourself the best chance to achieve the
            results you want. Certain stages may take several sessions. Below is
            my best estimate of the care you may need. Remember each person’s or
            couple’s need for care will vary. Your schedule may be altered based
            on your progress. Sessions are not limited to 1hr. Length of
            session(s) can be tailored to your needs.{' '}
          </Text>
          <Text style={{marginTop: 10, color: '#000'}}>
            I cannot guarantee success, no one can, but this plan of care will
            encourage the best outcome.
          </Text>
          <Text style={{marginTop: 10, color: '#000'}}>
            Session Frequency ___ Weekly ___ Bi-weekly M T W TH F Time
            _______________ *24 hour notice is required on all rescheduled
            appointments
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>1 </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Crisis Diffusion{' '}
              </Text>
              Some situations demand immediate attention to prevent harm or
              severe worsening of the problem.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>2 </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>History </Text>
              Your therapist needs to know the history behind your presenting
              problem.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>3 </Text>
            <Text style={{marginTop: 10, color: '#000', fontWeight: 'bold'}}>
              Finding Your Motivation
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>4 </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Problem Discussion{' '}
              </Text>
              Your therapist needs to know how you see the problem.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>5 </Text>
            <Text style={{marginTop: 10, color: '#000', fontWeight: 'bold'}}>
              Specialties listed next for example:
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>{'  '} </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>___ EMDR </Text>
              Eye Movement Desensitization Reprocessing technique{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>6 </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Hypnotherapy{' '}
              </Text>
              When agreed to be beneficial
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>7 </Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>EFT </Text>When
              agreed to be beneficial
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'  '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              Career Exploration/Planning Assessment/Labor Market Research
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>8 </Text>
            <Text style={{marginTop: 10, color: '#000', fontWeight: 'bold'}}>
              Solution Discussion{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'  '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              Together we need to arrive at a solution that works for you.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'  '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              Incl Homework 1._____ 2.______3.______4._____5_____ (Each
              number/blank is a homework assignment)
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'9 '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Spiritual Strengthening{' '}
              </Text>
              Together we explore spiritual connectivity
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'10 '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Solution Enactment{' '}
              </Text>
              Solution Enactment You must learn to apply the solution in various
              situations .This may take time.{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}> {'11 '}</Text>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Assessment{' '}
              </Text>
              After working together, we need to determine the effectiveness our
              approach and decide what is needed for your future success.
            </Text>
          </View>
          <View>
            <Text style={{marginTop: 10, color: '#000', fontWeight: '300'}}>
              Number of hours
            </Text>
            <View style={{marginTop: '2%'}}>
              <TextInput
                style={{
                  backgroundColor: colors.backGrey,
                  padding: 10,
                  marginBottom: '5%',
                }}
                placeholderTextColor={'#000'}
                placeholder="Completed"
              />
              <TextInput
                style={{backgroundColor: colors.backGrey, padding: 10}}
                placeholderTextColor={'#000'}
                placeholder="Recommended"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Yes Assessment Package Recommended{' '}
              </Text>
              This allows for best targeted interventions and tracking progress
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 10, color: '#000'}}>
              <Text style={{color: '#000', fontWeight: 'bold'}}>
                Yes Periodic Evaluations{' '}
              </Text>
              Your happiness and success are built on ongoing evaluation and
              management of your stressors. These wellness sessions can be as
              frequent as once a week or as few as once a year. We will work
              together to determine the best schedule of care for you.
            </Text>
          </View>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginBottom: '2%'}}>
          <AppButton
            title={'Done'}
            onPress={() => {
              console.log('Done is pressed');
            }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

export default TherapistPlaneofCare;
