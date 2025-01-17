import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
//styles
import { stylesLanguage } from "../styles/stylesLanguage";


const LanguageComponent = (props: any) => {
    return (
        <ScrollView>
          <View key={"language-view"} style={stylesLanguage.containerNumbers}>
            { props.culinaryExperience.languages.map((language: any) => {
              
              return (
                  <TouchableOpacity 
                    key={`${language.name}-${language.id}-touch`}
                    
                    style={props.selectedLanguage && props.selectedLanguage.id == language.id ? stylesLanguage.containerLanguageSelected 
                      : stylesLanguage.containerLanguage
                    }
                    onPress={
                      () => {
                          props.setSelectedLanguage({id: language.id, name: language.name});
                          props.setStep(4);
                      }
                    }
                  >
                    <Text key={`${language.name}-${language.id}-text`}  style={props.selectedLanguage && props.selectedLanguage.id == language.id ? stylesLanguage.languageTextSelected : stylesLanguage.languageText}>{language.name}</Text>
                  </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
    );
}


export {LanguageComponent}