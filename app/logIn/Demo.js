import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';

import {CodeField, Cursor,} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#259645',
        textAlign: 'center',
        color:'#307DEE',
    },
    focusCell: {
        borderColor: '#307DEE',
    },
});


class Demo extends Component{
    state={
        vcodeTxt:""
    }

    onVcodeChangeText=(vcodeTxt)=>{
        this.setState({vcodeTxt})
    }

    render(){
        return (

            <CodeField

                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={this.state.vcodeTxt}
                onChangeText={this.onVcodeChangeText}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                    >
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                )}
            />

        );
    }
}


export default App;
